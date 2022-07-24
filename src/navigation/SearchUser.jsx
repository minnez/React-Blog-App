import '../styles/searchuser.css'

import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

const SearchUser = () => {
    const { isLightTheme, light, dark } = useContext(ThemeContext)
    const theme = isLightTheme ? light : dark;

    return ( 
        <div className='main'style={{backgroundColor: theme.drop, color: theme.syntax}}>
            <span>Search</span>
            <form >
                <input type="search" placeholder='search for a user' style={{backgroundColor: theme.bg, color: theme.syntax}}/>
                <button>Search</button>
            </form>
            <div>
                <p>list of some members over here</p>
            </div>
        </div>
     );
}
 
export default SearchUser;