import { useState } from "react";
import "../styles/usercard.css"
import { useContext } from "react";
import { Usercontext } from "../contexts/Usercontext";
import { db } from "../firebase-config"
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

    const UserCard = ({ pid, pname }) => {

    const {profile,fetchProfileDetails,profileDetails} = useContext(Usercontext)

    // console.log("usercard.js")

    const[isfollowed,setfollowed] = useState(false)
    const handlefollow = async() =>{
        setfollowed(true)

        const followRef = doc(db, "profiles", profile.uid);
        // Atomically add a new follow to the "following" array field.
        // console.log("name",pname, "id",pid)
        await updateDoc(followRef, {
            following: arrayUnion({ id: pid, name: pname })
        });

        const followerRef = doc(db, "profiles", pid);
        // Atomically add a new follower to the "followers" of the user's array field.
        // console.log(profile.uid, profileDetails.username)
        await updateDoc(followerRef, {
            followers: arrayUnion({ id: profile.uid, name: profileDetails.username })
        });
        fetchProfileDetails()
    }

    const handleunfollow = async() =>{
        setfollowed(false)

        const unfollowRef = doc(db, "profiles", profile.uid);
        // Atomically add a new follow to the "following" array field.
        await updateDoc(unfollowRef, {
            following: arrayRemove({ id: pid, name: pname })
        });

        const unfollowerRef = doc(db, "profiles", pid);
        // Atomically add a new follower to the "followers" of the user's array field.
        console.log(profile.uid, profileDetails.username)
        await updateDoc(unfollowerRef, {
            followers: arrayRemove({ id: profile.uid, name: profileDetails.username })
        });
        fetchProfileDetails()
    }
    

    return ( 
        <div className="user-main">
            <span>{ pname }</span>
            {!isfollowed && <button onClick={handlefollow}>follow</button>}
            {isfollowed && <button onClick={handleunfollow}>following</button>}
        </div>
     );
}
 
export default UserCard;