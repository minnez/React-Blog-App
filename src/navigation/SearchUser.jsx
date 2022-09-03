import "../styles/searchuser.css";

import { db } from "../firebase-config";
import { getDocs, collection } from "firebase/firestore";

import { ThemeContext } from "../contexts/ThemeContext";
import { Usercontext } from "../contexts/Usercontext";
import { useContext, useState, useEffect } from "react";
import UserCard from "../components/UserCard";

const SearchUser = () => {
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;

    const { profileDetails, profile } = useContext(Usercontext);
    const [profiles, setProfiles] = useState([]);
    const profilesCollectionRef = collection(db, "profiles");
    const [error, setError] = useState();

    const getAllProfiles = async () => {
        try {
            const data = await getDocs(profilesCollectionRef);
            const userprofiles = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            //get all the following of user

            let isFollowing = [];

            //filter out all the following from the list of all users and store in isFollowing
            profileDetails.following.filter((user) =>
                isFollowing.push(user.id)
            );
            // console.log("is following",isFollowing)
            // console.log("all profiles",userprofiles)
            // console.log("profiledetails",profileDetails)

            //remove current user form list of all users and store rest in notFollowed
            const profilesExceptUser = userprofiles.filter(
                (userprofile) => userprofile.id !== profile.uid
            );
            // console.log("profilesExceptuser",profilesExceptUser)
            const notFollowed = profilesExceptUser.filter((profile) => {
                if (!isFollowing.includes(profile.id)) {
                    return profile;
                }
            });
            setProfiles(notFollowed);
        } catch (error) {
            setError(error.message);
        }
    };
    useEffect(() => {
        getAllProfiles();
    }, [profileDetails]);

    return (
        <div
            className="main"
            style={{ backgroundColor: theme.drop, color: theme.syntax }}
        >
            <span>Search</span>
            <form>
                <input
                    type="search"
                    placeholder="search for a user"
                    style={{ backgroundColor: theme.bg, color: theme.syntax }}
                />
                <button>Search</button>
            </form>
            {!profileDetails && (
                <div
                    style={{
                        padding: "20px",
                        textAlign: "center",
                        color: "#777",
                    }}
                >
                    Loading ...
                </div>
            )}
            <div
                className="userlist"
                style={{ width: "90%", maxWidth: "400px" }}
            >
                {!profiles ? (
                    <div>No users to follow</div>
                ) : (
                    profiles.map((profiles) => (
                        <UserCard
                            key={profiles.id}
                            pid={profiles.id}
                            pname={profiles.username}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default SearchUser;
