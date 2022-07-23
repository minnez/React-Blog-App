import { Navigate, Outlet, useLocation } from "react-router-dom";
import Profile from './navigation/Profile';
import Navbar from './navigation/Navbar';
import Newblog from './navigation/Newblog';
import BlogContextProvider from './contexts/BlogContext';

const Authenticate = () => {
    const location = useLocation()
    const token = sessionStorage.getItem("currentuser")
    let auth = {'token':token}
    return ( 
        <BlogContextProvider>
            { auth.token ? 
            <div className='grid-3-col'>
                <Navbar/>
                <Profile/>
                <div className='middle'>
                    <Outlet/>
                </div>
                <Newblog />
            </div> 
            : <Navigate to="/login" state={{ from: location }} replace /> }
        </BlogContextProvider>
     );
}
 
export default Authenticate;