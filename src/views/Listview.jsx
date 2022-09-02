import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { BlogContext } from "../contexts/BlogContext";
import "../styles/listview.css";
import { IconButton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
    addDoc,
    getDocs,
    getDoc,
    doc,
    collection,
    query,
    where,
    deleteDoc,
    serverTimestamp,
    orderBy,
    updateDoc,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { Usercontext } from "../contexts/Usercontext";

const Listview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { oneblogId, blogTitle, blogBody, ownerId, author, blogTime } =
        location.state;

    const [oneBlog, setOneBlog] = useState();
    const [blogComments, setblogComments] = useState([]);
    const [error, setError] = useState();
    const [isPending, setisPending] = useState(false);
    const [profileID, setprofileID] = useState();
    const [profileName, setProfileName] = useState();
    const [body, setBody] = useState();
    const [openComment, setOpenComment] = useState(false);
    const [confirmationBox, setconfirmationBox] = useState(false);
    const [Liked, setLiked] = useState(false);

    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;
    const { getPosts } = useContext(BlogContext);
    const { profile, profileDetails, fetchProfileDetails } =
        useContext(Usercontext);

    const goback = () => {
        navigate(-1);
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        const commentsCollectionRef = collection(db, "comments");
        const comment = {
            body,
            blogID: oneblogId,
            profileID,
            profileName,
            createdAt: serverTimestamp(),
        };
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
        const q = await query(
            commentsRef,
            where("blogID", "==", oneblogId),
            orderBy("createdAt")
        );
        const querySnapshot = await getDocs(q);
        // console.log("setting comments")
        setblogComments(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        opencommentsetion();
    };
    const fetchOneBlog = async () => {
        try {
            const docRef = doc(db, "blogs", oneblogId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setOneBlog(docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                setError("No such document!");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handlelike = async () => {
        setLiked(true);

        const likeRef = doc(db, "blogs", oneblogId);

        await updateDoc(likeRef, {
            likes: arrayUnion({
                id: profile.uid,
                name: profileDetails.username,
            }),
        });

        const likerRef = doc(db, "profiles", profile.uid);

        await updateDoc(likerRef, {
            liked: arrayUnion(oneblogId),
        });
        fetchProfileDetails();
        fetchOneBlog();
        getPosts();
        // console.log("liked");
    };
    const handleUnlike = async () => {
        setLiked(false);

        const unlikeRef = doc(db, "blogs", oneblogId);
        await updateDoc(unlikeRef, {
            likes: arrayRemove({
                id: profile.uid,
                name: profileDetails.username,
            }),
        });

        const unlikerRef = doc(db, "profiles", profile.uid);

        await updateDoc(unlikerRef, {
            liked: arrayRemove(oneblogId),
        });
        fetchProfileDetails();
        fetchOneBlog();
        getPosts();
        // console.log("unliked");
    };

    useEffect(() => {
        //fetch request to get comments
        // console.log("listview.js")
        if (profileDetails) {
            fetchOneBlog();
            fetchComments();
            setprofileID(profile.uid);
        }

        try {
            if (profileDetails.liked.includes(oneblogId)) {
                setLiked(true);
            } else {
                setLiked(false);
            }
        } catch (error) {
            setError(error.message);
        }
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
                <h2 className="c-h">{blogTitle}</h2>
                <p className="c-b">{blogBody}</p>
                <div className="blog-info">
                    <div
                        className="time"
                        style={{ backgroundColor: theme.drop, color: theme.li }}
                    >
                        <span>{blogTime}</span>
                    </div>
                    <Link
                        className="underline"
                        to={"/aboutprofile/" + ownerId}
                        state={{ back: location.pathname }}
                    >
                        <div className="ownername">{author}</div>
                    </Link>
                </div>

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
                {!Liked && (
                    <IconButton
                        sx={{
                            backgroundColor: theme.drop,
                            color: theme.syntax,
                            margin: "5px",
                        }}
                        onClick={handlelike}
                        className="iconss"
                        size="medium"
                    >
                        <FavoriteBorderOutlinedIcon fontSize="medium"></FavoriteBorderOutlinedIcon>
                    </IconButton>
                )}
                {Liked && (
                    <IconButton
                        sx={{
                            backgroundColor: theme.drop,
                            color: theme.syntax,
                            margin: "5px",
                        }}
                        onClick={handleUnlike}
                        className="iconss"
                        size="medium"
                    >
                        <FavoriteIcon fontSize="medium"></FavoriteIcon>
                    </IconButton>
                )}
                {profile.uid === ownerId && (
                    <IconButton
                        sx={{
                            backgroundColor: theme.drop,
                            color: theme.syntax,
                            margin: "5px",
                        }}
                        className="iconss"
                        onClick={() => setconfirmationBox(true)}
                        size="medium"
                    >
                        <DeleteOutlinedIcon fontSize="medium"></DeleteOutlinedIcon>
                    </IconButton>
                )}
            </div>
            <div style={{ borderColor: theme.li }} className="blog-stats">
                {oneBlog && (
                    <Link
                        className="link-fix"
                        to={"/likes/" + oneblogId}
                        state={{
                            likeslist: oneBlog.likes,
                        }}
                    >
                        <div className="likes-no">
                            {oneBlog && oneBlog.likes.length}
                            {!oneBlog && 0}{" "}
                            <span style={{ color: theme.li }}>Likes</span>
                        </div>
                    </Link>
                )}
                <div className="comments-no">
                    {blogComments.length}
                    {"  "}
                    <span style={{ color: theme.li }}>Comments</span>
                </div>
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
                        <div
                            className="commentss"
                            style={{ borderColor: theme.li }}
                            key={index}
                        >
                            <p>{comment.body}</p>
                            <div className="comment-info">
                                <div
                                    className="time"
                                    style={{
                                        backgroundColor: theme.drop,
                                        color: theme.li,
                                    }}
                                >
                                    <span>
                                        {comment.createdAt
                                            .toDate()
                                            .toString()
                                            .substring(0, 21)}
                                    </span>
                                </div>
                                <Link
                                    className="underline"
                                    to={"/aboutprofile/" + comment.profileID}
                                    state={{ back: location.pathname }}
                                >
                                    <div className="ownername">
                                        {comment.profileName}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )
                )}

            <Modal
                open={confirmationBox}
                onClose={() => setconfirmationBox(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        width: 200,
                        border: "0px",
                        outline: "0px",
                    }}
                >
                    <div className="confirmation-box">
                        <p>Continue to delete post ?</p>
                        <div className="confirmation-btns">
                            <button
                                onClick={() => setconfirmationBox(false)}
                                className="btn cancel"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handledelete}
                                className="btn delete"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default Listview;
