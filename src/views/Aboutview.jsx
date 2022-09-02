import { useState } from "react";
import { useEffect, useContext } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { Usercontext } from "../contexts/Usercontext";
import Book from "../components/Book";
import { db } from "../firebase-config";
import {
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    collection,
    query,
    where,
    getDocs,
    orderBy,
} from "firebase/firestore";
import "../styles/aboutview.css";
import Image from "../images/pp.jpg";

const Aboutview = () => {
    const navigate = useNavigate();
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;
    const { profileDetails, profile, fetchProfileDetails } =
        useContext(Usercontext);
    const { id } = useParams();
    const location = useLocation();
    const [aboutprofile, setaboutprofile] = useState();
    const [profileBlogs, setProfileBlogs] = useState();
    const [error, setError] = useState();
    const [isfollowed, setIsfollowed] = useState(false);
    const [followstate, setFollowState] = useState(false);
    const [isSameUser, setIsSameUser] = useState(false);

    const goback = () => {
        if (location.state && location.state.back.includes("listview")) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };
    const fetchProfileDetail = async () => {
        try {
            const docRef = doc(db, "profiles", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                // console.log(docSnap.data())
                setaboutprofile(docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                setError("No such document!");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchProfileBlogs = async () => {
        const profileblogsRef = collection(db, "blogs");
        const q = await query(
            profileblogsRef,
            where("profileID", "==", id),
            orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        // console.log("setting comments")
        setProfileBlogs(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    };

    const handlefollow = async () => {
        setIsfollowed(true);
        const followRef = doc(db, "profiles", profile.uid);
        // Atomically add a new follow to the "following" array field.
        // console.log("name",pname, "id",pid)
        await updateDoc(followRef, {
            following: arrayUnion({
                id: aboutprofile.userId,
                name: aboutprofile.username,
            }),
        });

        const followerRef = doc(db, "profiles", aboutprofile.userId);
        // Atomically add a new follower to the "followers" of the user's array field.
        // console.log(profile.uid, profileDetails.username)
        await updateDoc(followerRef, {
            followers: arrayUnion({
                id: profile.uid,
                name: profileDetails.username,
            }),
        });
        fetchProfileDetails();
    };

    const handleunfollow = async () => {
        setIsfollowed(false);

        const unfollowRef = doc(db, "profiles", profile.uid);
        // Atomically add a new follow to the "following" array field.
        await updateDoc(unfollowRef, {
            following: arrayRemove({
                id: aboutprofile.userId,
                name: aboutprofile.username,
            }),
        });

        const unfollowerRef = doc(db, "profiles", aboutprofile.userId);
        // Atomically add a new follower to the "followers" of the user's array field.
        // console.log(profile.uid, profileDetails.username);
        await updateDoc(unfollowerRef, {
            followers: arrayRemove({
                id: profile.uid,
                name: profileDetails.username,
            }),
        });
        fetchProfileDetails();
    };

    useEffect(() => {
        try {
            const following = profileDetails.following.map((following) => {
                return following.id;
            });
            const followers = profileDetails.followers.map((followers) => {
                return followers.id;
            });
            if (followers.includes(id)) {
                setFollowState(true);
            } else {
                setFollowState(false);
            }
            if (following.includes(id)) {
                setIsfollowed(true);
            }
        } catch (error) {
            setError(error.message);
        }

        if (profileDetails && profileDetails.userId === id) {
            setaboutprofile(profileDetails);
            setIsSameUser(true);
            fetchProfileBlogs();
        } else {
            fetchProfileDetail();
            fetchProfileBlogs();
        }
    }, [profileDetails, id]);

    return (
        <div
            className="aboutview-main"
            style={{ backgroundColor: theme.drop, color: theme.syntax }}
        >
            <button
                onClick={goback}
                style={{ backgroundColor: theme.drop, color: theme.syntax }}
                className="back"
            >
                &larr;
            </button>
            {!aboutprofile && <div className="loading">Loading...</div>}
            {aboutprofile && (
                <div className="about-profile">
                    <div className="about-profile-picture">
                        <img
                            src={Image}
                            alt="efdffefdef"
                            style={{
                                width: "130px",
                                height: "130px",
                                position: "relative",
                                top: "-5px",
                                left: "-5px",
                            }}
                        />
                    </div>
                    <div className="about-name-email">
                        <div className="name">{aboutprofile.username}</div>
                        <div className="email">{aboutprofile.email}</div>
                    </div>
                    {!isSameUser && (
                        <div className="follow-hub">
                            <div className="already-follows">
                                {followstate && (
                                    <span
                                        style={{
                                            backgroundColor: theme.bg,
                                            color: theme.syntax,
                                        }}
                                        className="follow-state"
                                    >
                                        Follows you
                                    </span>
                                )}
                                {isfollowed && (
                                    <button
                                        onClick={handleunfollow}
                                        className="unfollow"
                                    >
                                        Following
                                    </button>
                                )}
                                {!isfollowed && (
                                    <button
                                        onClick={handlefollow}
                                        className="follow"
                                    >
                                        Follow
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="about-follows">
                        <Link
                            className="link-fix"
                            to={"/following"}
                            state={{
                                returnPath: location.pathname,
                                following: aboutprofile.following,
                                followers: aboutprofile.followers,
                            }}
                        >
                            <div className="f-n">
                                {aboutprofile.following.length}
                                <div className="f-l">&nbsp;Following</div>
                            </div>
                        </Link>
                        <Link
                            className="link-fix"
                            to={"/followers"}
                            state={{
                                returnPath: location.pathname,
                                followers: aboutprofile.followers,
                                following: aboutprofile.following,
                            }}
                        >
                            <div className="f-n">
                                {aboutprofile.followers.length}
                                <div className="f-l">&nbsp;Followers</div>
                            </div>
                        </Link>
                    </div>
                </div>
            )}
            <div className="profile-posts">
                <div
                    style={{
                        backgroundColor: theme.drop,
                        paddingTop: "3px",
                        minHeight: "100%",
                        borderTop: "0.2px solid",
                        borderColor: theme.li,
                        marginTop: "10px",
                    }}
                >
                    {!profileBlogs && (
                        <div className="no-posts">Loading ...</div>
                    )}
                    {profileBlogs && profileBlogs.length === 0 && (
                        <div style={{ color: theme.li }} className="no-posts">
                            No posts for this User
                        </div>
                    )}
                    {profileBlogs &&
                        profileBlogs.length > 0 &&
                        profileBlogs.map((blog) => (
                            <Book
                                key={blog.id}
                                title={blog.title}
                                body={blog.body}
                                id={blog.id}
                                authorid={blog.profileID}
                                author={blog.profileName}
                                createdAt={blog.createdAt
                                    .toDate()
                                    .toString()
                                    .substring(0, 21)}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Aboutview;
