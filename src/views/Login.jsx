import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { Usercontext } from '../contexts/Usercontext';
import { useContext,useState } from 'react';
import { IconButton } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import '../styles/login.css'
const Login = () => {
    const { isLightTheme, light, dark, toggletheme } = useContext(ThemeContext)
    const theme  = isLightTheme ? light : dark;

    const {profiles} = useContext(Usercontext)

    const navigate = useNavigate()
    const[username,setUsername] = useState('')
    const[password,setPassword] = useState('')
    const[isPending, setisPending] = useState(false)

    

    const handlelogin = (e) =>{
        e.preventDefault();
        setisPending(true)
        // mocking the backend authentication
        let userlist = []
        profiles.forEach(profile => {
            // pushes all names of users into an array for easier checking
            userlist.push(profile.name)
        });
        if(userlist.includes(username)){
            profiles.forEach(profile => {
                if(profile.name === username){
                    if(profile.password === password){
                        console.log('logged in')
                        // setting the user id into the session storage as a token
                        sessionStorage.setItem("currentuser",profile.id)
                        navigate('/')
                        setisPending(false)
                    }else{
                        alert('incorrect password')
                        setisPending(false)
                    }
                }
            });
        }else{
            setisPending(false)
            alert('user not found. Please sign up to be a member')
        }
    }

    return (  
        <div className="login"style={{backgroundColor: theme.bg, color: theme.syntax}}>
            <IconButton sx={{backgroundColor: theme.syntax, color: theme.ui, margin:'5px'}} onClick={toggletheme} size='medium'>
                { !isLightTheme && <LightModeOutlinedIcon fontSize='medium'></LightModeOutlinedIcon>}
                {isLightTheme && <NightlightOutlinedIcon fontSize='medium'></NightlightOutlinedIcon>}
            </IconButton>
            <h2>Login here</h2>
            <form style={{backgroundColor: theme.bg, color: theme.syntax}}>
                <label htmlFor="username">Name</label>
                <input 
                    type="text" id='username' 
                    placeholder="your name" 
                    style={{backgroundColor: theme.bg, color: theme.syntax}}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
                <label htmlFor="pwd">Password</label>
                <input 
                    type="password" 
                    id="pwd" 
                    placeholder="password" 
                    style={{backgroundColor: theme.bg, color: theme.syntax}}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                {!isPending && <button onClick={handlelogin}>Login</button>}
                {isPending && <button onClick={handlelogin} disabled>. . .</button>}
                <span>Don't have an account?<Link to="/signup">sign up here</Link></span>
            </form>
        </div>
    );
}
 
export default Login;