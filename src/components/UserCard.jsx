import { useEffect, useState, useContext } from "react";
import "../styles/usercard.css";
import { Usercontext } from "../contexts/Usercontext";
import { db } from "../firebase-config";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { Link, useLocation } from "react-router-dom";

const UserCard = ({ pid, pname }) => {
    const { profile, fetchProfileDetails, profileDetails } =
        useContext(Usercontext);
    const location = useLocation();
    const [isfollowed, setfollowed] = useState(false);

    const handlefollow = async () => {
        setfollowed(true);

        const followRef = doc(db, "profiles", profile.uid);
        // Atomically add a new follow to the "following" array field.
        // console.log("name",pname, "id",pid)
        await updateDoc(followRef, {
            following: arrayUnion({ id: pid, name: pname }),
        });

        const followerRef = doc(db, "profiles", pid);
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
        setfollowed(false);

        const unfollowRef = doc(db, "profiles", profile.uid);
        // Atomically add a new follow to the "following" array field.
        await updateDoc(unfollowRef, {
            following: arrayRemove({ id: pid, name: pname }),
        });

        const unfollowerRef = doc(db, "profiles", pid);
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
        // console.log(profileDetails.following);
        // console.log("usercard.js");
        if (profileDetails) {
            const alreadyfollowed = profileDetails.following.map((user) => {
                return user.id;
            });
            if (alreadyfollowed.includes(pid)) {
                setfollowed(true);
            }
        }
    }, [profileDetails]);

    return (
        <div className="user-main">
            <Link
                to={"/aboutprofile/" + pid}
                state={{ back: location.pathname }}
                className="inherit"
            >
                <span>{pname}</span>
            </Link>
            {profile.uid != pid && (
                <div>
                    {!isfollowed && (
                        <button className="follow-btn" onClick={handlefollow}>
                            follow
                        </button>
                    )}
                    {isfollowed && (
                        <button
                            className="follow-btn follow-btn2"
                            onClick={handleunfollow}
                        >
                            following
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserCard;
