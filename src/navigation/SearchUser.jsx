import '../styles/searchuser.css'

import { ThemeContext } from "../contexts/ThemeContext";
import { Usercontext } from '../contexts/Usercontext';
import { BlogContext } from '../contexts/BlogContext';
import { useContext } from "react";
import UserCard from '../components/UserCard';

const SearchUser = () => {
    const { isLightTheme, light, dark } = useContext(ThemeContext)
    const theme = isLightTheme ? light : dark;

    const { profiles } = useContext(Usercontext)
    const { name, following } = useContext(BlogContext)
    // following.push(name)// Adds the username of current user to omit it from the list
    console.log(following)
    const notFollowing = profiles.filter(profile => !following.includes(profile.name))//filtered based on already followed users
    console.log(notFollowing)

    return ( 
        <div className='main'style={{backgroundColor: theme.drop, color: theme.syntax}}>
            <span>Search</span>
            <form >
                <input type="search" placeholder='search for a user' style={{backgroundColor: theme.bg, color: theme.syntax}}/>
                <button>Search</button>
            </form>
            <div style={{width:"90%", maxWidth:'400px'}} >
                <p>list of some members over here</p>
                {!notFollowing ?<div>No one to follow now</div> :
                    notFollowing.map(profile =>(
                        <UserCard key={profile.id} pid={profile.id} pname={profile.name}/>
                ))}
            </div>
        </div>
     );
}
 
export default SearchUser;