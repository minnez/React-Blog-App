import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import Profilemobile from "./Profilemobile"
import SearchUsermobile from "./SearchUsermobile"
import { useState } from "react";

const Navbar = () => {
    const { isLightTheme, light, dark,toggletheme } = useContext(ThemeContext)
    const theme = isLightTheme ? light : dark;
    // console.log("navigation.js")

    const[profile, setprofile] = useState()
    const[searchuser, setsearchuser] = useState()


    return ( 
        <div className="navbar" style={{backgroundColor: theme.ui, color: theme.syntax}}>
            <IconButton className="button" sx={{backgroundColor: theme.bg, color: theme.ui, margin:'5px'}} onClick={toggletheme} size='medium'>
                { !isLightTheme && <LightModeOutlinedIcon sx={{color:"#ccc"}} fontSize='medium'></LightModeOutlinedIcon>}
                {isLightTheme && <NightlightOutlinedIcon sx={{color:"#000"}} fontSize='medium'></NightlightOutlinedIcon>}
            </IconButton>
            <h1>Blogs</h1>
            <div className="links">
                <Link style={{color:theme.syntax,marginLeft:"20px"}} to="/">Home</Link>
                {/* <Link style={{color:theme.syntax,marginLeft:"20px"}} to="/contactview">Contact</Link> */}
                <button onClick={()=> setprofile(true)} className="menu">menu</button>
                <button onClick={() => setsearchuser(true)} className="menu">search</button>
            </div>
            { profile && <Profilemobile close={setprofile}/>}
            { searchuser && <SearchUsermobile close={setsearchuser}/>}
        </div>
     );
}
 
export default Navbar;