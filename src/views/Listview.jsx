import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { BlogContext } from "../contexts/BlogContext";
import "../styles/listview.css";
import { IconButton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Comments from "../components/Comment";
import {
    addDoc,
    getDocs,
    doc,
    collection,
    query,
    where,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { Usercontext } from "../contexts/Usercontext";

const Listview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { oneblogId, blogTitle, blogBody, ownerId, author } = location.state;

    const [blogComments, setblogComments] = useState([]);
    const [error, setError] = useState();
    const [isPending, setisPending] = useState(false);
    const [profileID, setprofileID] = useState();
    const [profileName, setProfileName] = useState();
    const [body, setBody] = useState();
    const [openComment, setOpenComment] = useState(false);

    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;
    const { getPosts } = useContext(BlogContext);
    const { profile, profileDetails } = useContext(Usercontext);

    const goback = () => {
        navigate(-1);
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        const commentsCollectionRef = collection(db, "comments");
        const comment = { body, blogID: oneblogId, profileID, profileName };
        setisPending(true);
        await addDoc(commentsCollectionRef, comment);
        setisPending(false);
        // console.log("comment added")
        setBody("");
        setOpenComment(false);
        fetchComments();
    };

    const handledelete = async () => {
        const docRef = doc(db, "blogs", oneblogId);
        await deleteDoc(docRef);
        // console.log("blog deleted")

        // deleting all comments under deleted post
        if (blogComments) {
            blogComments.forEach((comment) => {
                const commentRef = doc(db, "comments", comment.id);
                deleteDoc(commentRef);
            });
        }
        getPosts();
        navigate(-1);
    };
    const opencommentsetion = () => {
        setOpenComment(!openComment);
        try {
            setProfileName(profileDetails.username);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchComments = async () => {
        // console.log("entered fetch comment")
        const commentsRef = collection(db, "comments");
        const q = await query(commentsRef, where("blogID", "==", oneblogId));
        const querySnapshot = await getDocs(q);
        // console.log("setting comments")
        setblogComments(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        opencommentsetion();
    };

    useEffect(() => {
        //fetch request to get comments
        // console.log("listview.js")
        fetchComments();
        setprofileID(profile.uid);
    }, [oneblogId, profile, profileDetails]);

    return (
        <div
            className="listview"
            style={{ backgroundColor: theme.drop, color: theme.syntax }}
        >
            <div className="listview-child">
                <button
                    onClick={goback}
                    style={{ backgroundColor: theme.drop, color: theme.syntax }}
                    className="back"
                >
                    &larr;
                </button>
                <h2>{blogTitle}</h2>
                <p>{blogBody}</p>
                <Link className="underline" to={"/aboutprofile/" + ownerId}>
                    <div className="ownername">{author}</div>
                </Link>
                <IconButton
                    sx={{
                        backgroundColor: theme.drop,
                        color: theme.syntax,
                        margin: "5px",
                    }}
                    className="iconss"
                    onClick={opencommentsetion}
                    size="medium"
                >
                    <CommentOutlinedIcon fontSize="medium"></CommentOutlinedIcon>
                </IconButton>
                {profile.uid === ownerId && (
                    <IconButton
                        sx={{
                            backgroundColor: theme.drop,
                            color: theme.syntax,
                            margin: "5px",
                        }}
                        className="iconss"
                        onClick={handledelete}
                        size="medium"
                    >
                        <DeleteOutlinedIcon fontSize="medium"></DeleteOutlinedIcon>
                    </IconButton>
                )}
            </div>

            <span className="comment-title">comments</span>
            {openComment && (
                <div className="comment-message-box">
                    <form
                        onSubmit={handlesubmit}
                        style={{
                            backgroundColor: theme.drop,
                            color: theme.syntax,
                        }}
                    >
                        <button
                            onClick={() => setOpenComment(false)}
                            data-testid="closecomment"
                            className="close"
                            style={{
                                backgroundColor: theme.bg,
                                color: theme.syntax,
                            }}
                        >
                            &times;
                        </button>
                        <textarea
                            style={{
                                backgroundColor: theme.bg,
                                color: theme.syntax,
                            }}
                            required
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="your comment here"
                        ></textarea>
                        {!isPending && (
                            <button className="comment-btn">comment</button>
                        )}
                        {isPending && (
                            <button className="comment-btn">sending ...</button>
                        )}
                    </form>
                </div>
            )}
            {!(blogComments.length > 0) && (
                <div style={{ padding: "20px", color: "#ccc" }}>
                    No comments yet
                </div>
            )}
            {blogComments.length > 0 &&
                blogComments.map(
                    (
                        comment,
                        index //checks if theres comments before rendering the comments
                    ) => (
                        <div className="commentss" key={index}>
                            <p>{comment.body}</p>
                            <Link
                                className="underline"
                                to={"/aboutprofile/" + comment.profileID}
                            >
                                <div className="ownername">
                                    {comment.profileName}
                                </div>
                            </Link>
                        </div>
                    )
                )}
        </div>
    );
};

export default Listview;
