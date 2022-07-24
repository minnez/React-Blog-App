import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Book from "../components/Book";
import { BlogContext } from "../contexts/BlogContext";
import { Link } from "react-router-dom";

const Home = () => {
    const { blogs } = useContext(BlogContext)
    const { isLightTheme, light, dark } = useContext(ThemeContext)
    const theme = isLightTheme ? light : dark;
    const [blogss, setBooks] = useState([])

    useEffect(() =>{
        setBooks(blogs)
    },[blogs])


    return ( 
        <div className="insidehome">
            <div style={{backgroundColor: theme.drop, paddingTop:'3px',minHeight:'100%'}}>
                { blogss.map((blog)=>(
                    <Book key={blog.id} title={blog.title} body={blog.body} id={blog.id} author={blog.profileId}/>
                ))}
            </div>
            <Link className="addpost" to="/addblog"> </Link>
        </div>
     );
}
 
export default Home;