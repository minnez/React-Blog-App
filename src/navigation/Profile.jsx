import { ThemeContext } from "../contexts/ThemeContext";
import { useContext, useEffect, useState } from "react";
import '../styles/profile.css'
import Image from "../images/pp2.jpg";
import { Usercontext } from "../contexts/Usercontext";
import { useNavigate } from "react-router-dom";


const Profile = () => {
    const { isLightTheme, light, dark } = useContext(ThemeContext)
    const theme = isLightTheme ? light : dark;
    const {logout,profile,fetchProfileDetails,profileDetails,setUser} = useContext(Usercontext)

    const navigate = useNavigate()


    const handlelogout = async() =>{
        try{
            await logout();
            navigate('/login');
            console.log("you are logged out")
        }catch (e) {
            console.log(e.message)
        }
    }

    useEffect(()=> {
        console.log("profile.jsx")
        fetchProfileDetails()
    },[profile.uid])

    return ( 
        <div className="profile-main" style={{backgroundColor: theme.drop, color: theme.syntax}}>
            {!profileDetails && <span>loading...</span>}
            {profileDetails && (
                <div>
                    <div className="profile-img">
                        <img width="80" src={Image} alt="efdffefdef" />
                    </div>
                    {/* {setUser(profileDetails.username)} */}
                    <h3 className="profile-name" >{profileDetails.username}</h3>
                    <div className="profile-email">{profileDetails.email}</div>
                    <div className='fol'>
                        <div><span className="folNum">{profileDetails.following.length}</span> following</div>
                        <div><span className="folNum">{profileDetails.followers.length}</span> followers</div>
                    </div>
                </div>
            )}
            
        <button onClick={handlelogout} style={{backgroundColor: theme.bg, color: theme.syntax}}>logout</button>
        </div>
     );
}
 
export default Profile;