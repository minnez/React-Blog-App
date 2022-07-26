import { ThemeContext } from "../contexts/ThemeContext";
import { Usercontext } from "../contexts/Usercontext";
import { BlogContext } from "../contexts/BlogContext";
import { useContext, useState } from "react";
import "../styles/newblog.css";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase-config";
import { useEffect } from "react";

const Newblog = () => {
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;
    const { getPosts } = useContext(BlogContext);
    const { profile, profileDetails } = useContext(Usercontext);
    const { shownotify } = useContext(BlogContext);

    const navigate = useNavigate();
    const [profileID, setprofileID] = useState();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isPending, setisPending] = useState(false);

    const blogsCollectionRef = collection(db, "blogs");

    useEffect(() => {
        // console.log("newblog.js")
        setprofileID(profile.uid);
        // console.log(profileDetails.username)
        // setProfileName(profileDetails.username);
    }, [profile, profileDetails]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const blog = {
            profileID,
            title,
            body,
            profileName: profileDetails.username,
            likes: [],
            createdAt: serverTimestamp(),
        };
        setisPending(true);

        await addDoc(blogsCollectionRef, blog);
        setisPending(false);
        getPosts();
        // console.log("blog added")
        setBody("");
        setTitle("");
        navigate(-1);
        shownotify();
    };

    const goback = () => {
        navigate(-1);
    };
    return (
        <div
            className="newblog-main"
            style={{ backgroundColor: theme.drop, color: theme.syntax }}
        >
            <button
                data-testid="closenewblog"
                onClick={goback}
                style={{ backgroundColor: theme.drop, color: theme.syntax }}
                className="back"
            >
                &times;
            </button>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    style={{ backgroundColor: theme.bg, color: theme.syntax }}
                    placeholder="Blog title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    style={{ backgroundColor: theme.bg, color: theme.syntax }}
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="add a new blog"
                    cols="30"
                    rows="12"
                ></textarea>
                {!isPending && <button className="postt">post</button>}
                {isPending && (
                    <button className="postt" disabled>
                        posting ...
                    </button>
                )}
            </form>
        </div>
    );
};

export default Newblog;
