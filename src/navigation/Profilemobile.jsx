import { ThemeContext } from "../contexts/ThemeContext";
import { useContext, useEffect, useState } from "react";
import '../styles/profilemobile.css'
import Image from "../images/pp2.jpg";
import { Usercontext } from "../contexts/Usercontext";
import { useNavigate, Link } from "react-router-dom";


const Profile = ({close}) => {
    const { isLightTheme, light, dark } = useContext(ThemeContext)
    const theme = isLightTheme ? light : dark;
    const {logout,profile,fetchProfileDetails,profileDetails,setUser} = useContext(Usercontext)
    const [error, setError] = useState()

    const navigate = useNavigate()


    const handlelogout = async() =>{
        try{
            await logout();
            navigate('/login');
            // console.log("you are logged out")
        }catch (e) {
            setError(e.message)
        }
    }

    useEffect(()=> {
        // console.log("profile.jsx")
        fetchProfileDetails()
    },[profile.uid])

    return ( 
        <div className="mprofile-main" style={{backgroundColor: theme.drop, color: theme.syntax}}>
            <button onClick={()=>close(false)} className="mclose">close</button>
            {!profileDetails && <span>loading...</span>}
            {profileDetails && (
                <div className="mmm">
                    <div className="mprofile-img">
                        <img width="80" src={Image} alt="efdffefdef" />
                    </div>
                    <Link className="munderline" to={"/aboutprofile/"+profileDetails.userId}>
                        <h3 className="mprofile-name" >{profileDetails.username}</h3>
                    </Link>
                    <div className="mprofile-email">{profileDetails.email}</div>
                    <div className='mfol'>
                        <div><span className="mfolNum">{profileDetails.following.length}</span> following</div>
                        <div><span className="mfolNum">{profileDetails.followers.length}</span> followers</div>
                    </div>
                </div>
            )}
            
        <button onClick={handlelogout} className="mlogout" style={{backgroundColor: theme.bg, color: theme.syntax}}>logout</button>
        </div>
     );
}
 
export default Profile;