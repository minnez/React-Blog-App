import { useState } from "react";
import "../styles/usercard.css"
import { useContext } from "react";
import { BlogContext } from "../contexts/BlogContext";
const UserCard = ({ pid, pname }) => {

    const { followers, userId, name } = useContext(BlogContext)


    const[isfollowed,setfollowed] = useState()
    const handlefollow = () =>{
        setfollowed(!isfollowed)
        const change={"followers" : [name]}
        const addfollowing = {"following":[...followers,pname]}

        //this fetch(PATCH) request updates the user who is being followed
        fetch("http://localhost:8000/profiles/"+pid,{
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(change)
        }).then(() => {

            //this fetch (PATCH) request updates the current user's following
            fetch("http://localhost:8000/profiles/"+userId,{
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(addfollowing)
            }).then(() => {
                console.log('following added')
                
            })
            console.log('followed done')     
        })
    }
    

    return ( 
        <div className="user-main">
            <span>{ pname }</span>
            {!isfollowed && <button onClick={handlefollow}>follow</button>}
            {isfollowed && <button onClick={handlefollow}>following</button>}
        </div>
     );
}
 
export default UserCard;