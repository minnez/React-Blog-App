import { ThemeContext } from "../contexts/ThemeContext";
import { Usercontext } from "../contexts/Usercontext";
import { useContext, useState, useEffect } from "react";
import "../styles/comment.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";

const Comments = ({ close, blogid, fetchComments }) => {
    const [body, setBody] = useState("");
    const [blogID] = useState(blogid);
    const [isPending, setisPending] = useState(false);
    const [profileID, setprofileID] = useState();
    const [profileName, setProfileName] = useState();

    const commentsCollectionRef = collection(db, "comments");

    // console.log("comment.js")

    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;
    const { profile, profileDetails } = useContext(Usercontext);

    const handlesubmit = async (e) => {
        e.preventDefault();
        const comment = { body, blogID, profileID, profileName };
        setisPending(true);

        await addDoc(commentsCollectionRef, comment);
        setisPending(false);
        console.log("comment added");
        setBody("");

        fetchComments();
        close();
    };

    useEffect(() => {
        setprofileID(profile.uid);
        setProfileName(profileDetails.username);
    }, [profile]);

    return (
        <div className="comments">
            <form
                onSubmit={handlesubmit}
                style={{ backgroundColor: theme.bg, color: theme.syntax }}
            >
                <button
                    data-testid="closecomment"
                    className="close"
                    onClick={close}
                    style={{ backgroundColor: theme.bg, color: theme.syntax }}
                >
                    &times;
                </button>
                <textarea
                    style={{ backgroundColor: theme.drop, color: theme.syntax }}
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="your comment here"
                    cols="25"
                    rows="12"
                ></textarea>
                {!isPending && (
                    <button
                        style={{
                            backgroundColor: theme.bg,
                            color: theme.syntax,
                        }}
                    >
                        comment
                    </button>
                )}
                {isPending && (
                    <button
                        style={{
                            backgroundColor: theme.bg,
                            color: theme.syntax,
                        }}
                    >
                        sending ...
                    </button>
                )}
            </form>
        </div>
    );
};

export default Comments;
