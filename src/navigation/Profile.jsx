import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import '../styles/profile.css'
import Image from "../images/pp2.jpg";
import { BlogContext } from "../contexts/BlogContext";
import { useNavigate } from "react-router-dom";
const Profile = () => {
    const { isLightTheme, light, dark } = useContext(ThemeContext)
    const theme = isLightTheme ? light : dark;

    const {name, following, followers } = useContext(BlogContext)
    const navigate = useNavigate()


    const logout = () =>{
        sessionStorage.removeItem("currentuser")
        navigate("/login")
        console.log(sessionStorage.getItem("currentuser"))
    }

    return ( 
        <div className="profile-main" style={{backgroundColor: theme.drop, color: theme.syntax}}>
            <div className="profile-img">
                <img width="80" src={Image} alt="sfefdffefdef" />
            </div>
            <h3 className="profile-name" >{ name }</h3>
            <div className='fol'>
                <span>following: {following.length}</span>
                <span>followers: {followers.length}</span>
            </div>
        <button onClick={logout} style={{backgroundColor: theme.bg, color: theme.syntax}}>logout</button>
        </div>
     );
}
 
export default Profile;