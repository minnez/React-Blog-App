import { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { ThemeContext } from "../contexts/ThemeContext";
import { useParams } from 'react-router-dom'
import '../styles/listview.css'
import { IconButton } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Comments from '../components/Comment';

const Listview = () => {
    const navigate = useNavigate()
    let location = useLocation()// use to get state from previous link

    // variables or states used
    const { id } = useParams()
    const[blog, setBlog] = useState([])
    const[comment,setComment] = useState(false)

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

    const goback = () =>{
        navigate(-1)
    }
    const handlecomment = () =>{
        setComment(!comment)
    }
    const handledelete = () =>{
        fetch('http://localhost:8000/blogs/'+id,{
            method:'DELETE'
        }).then(() =>{
            console.log("deleted")
            navigate(-1)
        })
    }

    useEffect(()=>{

        //fetch request to get posts and comments
        const fetchBlog = async () =>{
            const res = await fetch('http://localhost:8000/blogs/'+id+'?_embed=comments')
                if(!res.ok){
                    throw Error('could not fetch the data for that resource');
                }
                setBlog( await res.json())
        }
        fetchBlog()
            
    },[id,blog.profileId])

    return ( 
        <div className='listview'style={{backgroundColor: theme.drop, color: theme.syntax}}>
            <button onClick={goback} style={{backgroundColor: theme.drop, color: theme.syntax}} className='back'>&larr;</button>
            <h2>{ blog.title }</h2>
            <p>{ blog.body }</p>
            <h3>{ location.state.author }</h3>
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
                <Comments blogid={id} close={handlecomment}/>
            </Box>
            </Modal>}

            <span>comments</span>
            {blog.comments && blog.comments.map(comment =>(//checks if theres comments before rendering the comments
                <p className='commentss' key={comment.id}>{ comment.body }</p>
            ))}
        </div>
     );
}
 
export default Listview;