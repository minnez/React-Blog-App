import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Book from "../components/Book";
import { BlogContext } from "../contexts/BlogContext";

const Home = () => {
    const { blogs } = useContext(BlogContext)
    const { isLightTheme, light, dark } = useContext(ThemeContext)
    const theme = isLightTheme ? light : dark;
    const [blogss, setBooks] = useState([])

    useEffect(() =>{
        setBooks(blogs)
        console.log("books set")
    },[blogs])


    return ( 
        <div style={{backgroundColor: theme.drop, paddingTop:'3px'}}>
            { blogss.map((blog)=>(
                <Book key={blog.id} title={blog.title} body={blog.body} id={blog.id} author={blog.profileId}/>
            ))}
        </div>
     );
}
 
export default Home;