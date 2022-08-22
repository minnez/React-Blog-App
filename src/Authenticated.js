import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Profile from './navigation/Profile';
import Navbar from './navigation/Navbar';
import SearchUser from "./navigation/SearchUser";
import BlogContextProvider from './contexts/BlogContext';
import { Usercontext } from '../src/contexts/Usercontext';
import { ThemeContext } from "./contexts/ThemeContext";

const Authenticate = () => {
    const { isLightTheme, light, dark } = useContext(ThemeContext)
    const theme = isLightTheme ? light : dark;
    const {profile} = useContext(Usercontext)

    const location = useLocation()
    let auth = {'token':profile}
    return ( 
        <BlogContextProvider>
            { auth.token ? 
            <div className='grid-3-col'>
                <Navbar/>
                <Profile/>
                <div style={{backgroundColor: theme.drop}} className='middle'>
                    <Outlet/>
                </div>
                <SearchUser />
            </div> 
            : <Navigate to="/login" state={{ from: location }} replace /> }
        </BlogContextProvider>
     );
}
 
export default Authenticate;