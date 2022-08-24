import { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { ThemeContext } from "../contexts/ThemeContext";
import { BlogContext } from "../contexts/BlogContext";
import { useParams } from 'react-router-dom'
import '../styles/listview.css'
import { IconButton } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Comments from '../components/Comment';
import { getDoc, getDocs, doc, collection, query, where, deleteDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const Listview = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { oneblogId } = location.state

    // variables or states used
    // const { id } = useParams()
    const[blog, setBlog] = useState([])
    const[blogComments, setblogComments] = useState([])
    const[comment,setComment] = useState(false)
    const[error, setError] = useState()


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 20,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const { isLightTheme, light, dark } = useContext(ThemeContext)
    const theme = isLightTheme ? light : dark;
    const { getPosts } = useContext(BlogContext)
    const goback = () =>{
        navigate(-1)
    }
    const handlecomment = () =>{
        setComment(!comment)
    }
    const handledelete = async() =>{
        const docRef = doc(db, "blogs", oneblogId);
        await deleteDoc(docRef)
        // console.log("blog deleted")

        // deleting all comments under deleted post
        if(blogComments){
            blogComments.forEach((comment)=>{
                const commentRef = doc(db, "comments", comment.id);
                deleteDoc(commentRef)
            })
        }
        getPosts()
        navigate(-1)
    }
    const fetchBlog = async () =>{
        // console.log("entered fetch blog")
        const docRef = doc(db, "blogs", oneblogId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // console.log("setting blog")
            setBlog(docSnap.data())
        } else {
            // doc.data() will be undefined in this case
            setError("No such document!");
        }
    }
    const fetchComments = async () => {
        // console.log("entered fetch comment")
        const commentsRef = collection(db, "comments");
        const q = await query(commentsRef, where("blogID", "==", oneblogId));
        const querySnapshot = await getDocs(q);
        // console.log("setting comments")
        setblogComments(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
    }

    useEffect(()=>{
        //fetch request to get posts and comments
        // console.log("listview.js")
        fetchBlog()
        fetchComments()
            
    },[])
    

    return ( 
        <div className='listview'style={{backgroundColor: theme.drop, color: theme.syntax}}>
            <button onClick={goback} style={{backgroundColor: theme.drop, color: theme.syntax}} className='back'>&larr;</button>
            <h2>{ blog.title }</h2>
            <p>{ blog.body }</p>
            {/* <h3>{ location.state.author }</h3> */}
            <IconButton 
                sx={{backgroundColor: theme.drop, color: theme.syntax, margin:'5px'}} 
                className='iconss' onClick={handlecomment}
                 size='medium'>
                    <CommentOutlinedIcon fontSize='medium'></CommentOutlinedIcon>
            </IconButton>
            <IconButton 
                sx={{backgroundColor: theme.drop, color: theme.syntax, margin:'5px'}} 
                className='iconss' onClick={handledelete} 
                size='medium'>
                    <DeleteOutlinedIcon fontSize='medium'></DeleteOutlinedIcon>
            </IconButton>
            { comment && <Modal
            open={comment}
            onClose={handlecomment}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Comments fetchComments={fetchComments} blogid={oneblogId} close={handlecomment}/>
            </Box>
            </Modal>}

            <span>comments</span>
            {blogComments && blogComments.map((comment, index) =>(//checks if theres comments before rendering the comments
                <p className='commentss' key={index}>{ comment.body }</p>
            ))}
        </div>
     );
}
 
export default Listview;