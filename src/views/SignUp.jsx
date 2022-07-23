import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { useContext,useState } from 'react';
import { IconButton } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import '../styles/login.css'
const SignUp = () => {
    const { isLightTheme, light, dark, toggletheme } = useContext(ThemeContext)
    const theme  = isLightTheme ? light : dark;

    const navigate = useNavigate()
    const[name,setUsername] = useState('')
    const[password,setPassword] = useState('')
    const[confirmpassword,setcpassword] = useState('')
    const[following] = useState([])
    const[followers] = useState([])
    const[isPending, setisPending] = useState(false)


    const handleSubmit = (e) =>{
        e.preventDefault();
        if(password !== confirmpassword){
            alert('password mismatch')
            return
        }
        const profile = { name, password,followers,following};
        setisPending(true)
        
        fetch("http://localhost:8000/profiles",{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profile)
        }).then(() => {
            console.log('new profile added')
            navigate("/login")
            setisPending(false)
        })
    }


    return (  
        <div className="login"style={{backgroundColor: theme.bg, color: theme.syntax}}>
            <IconButton sx={{backgroundColor: theme.syntax, color: theme.ui, margin:'5px'}} onClick={toggletheme} size='medium'>
                { !isLightTheme && <LightModeOutlinedIcon fontSize='medium'></LightModeOutlinedIcon>}
                {isLightTheme && <NightlightOutlinedIcon fontSize='medium'></NightlightOutlinedIcon>}
            </IconButton>
            <h2>Sign Up</h2>
            <form style={{backgroundColor: theme.bg, color: theme.syntax}}>
                <label htmlFor="username">Name</label>
                <input 
                    type="text" id='username' 
                    placeholder="your name" 
                    style={{backgroundColor: theme.bg, color: theme.syntax}}
                    value={name}
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
                <label htmlFor="confirmpwd">confirm password</label>
                <input 
                    type="password" 
                    id="confirmpwd" 
                    placeholder="password" 
                    style={{backgroundColor: theme.bg, color: theme.syntax}}
                    value={confirmpassword}
                    onChange={(e) => setcpassword(e.target.value)}
                    required />
                {!isPending && <button onClick={handleSubmit}>Join the community</button>}
                {isPending && <button onClick={handleSubmit} disabled>joining...</button>}
                <span>Already have an account?<Link to="/login">login here</Link></span>
            </form>
        </div>
    );
}
 
export default SignUp;