import { ThemeContext } from "../contexts/ThemeContext";
import { useContext, useState } from "react";
import '../styles/newblog.css'
import { useNavigate } from "react-router-dom";

const Newblog = () => {
    const { isLightTheme, light, dark } = useContext(ThemeContext)
    const theme = isLightTheme ? light : dark;

    const navigate = useNavigate()
    const profileId = Number(sessionStorage.getItem("currentuser"))
    const[title,setTitle] = useState('')
    const[body,setBody] = useState('')
    const[isPending, setisPending] = useState(false)

    const handleSubmit = (e) =>{
        e.preventDefault();
        const blog = { profileId, title, body };
        setisPending(true)
        
        fetch("http://localhost:8000/blogs",{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new blog added')
            navigate(0)
            setisPending(false)
        })
    }

    const goback = () =>{
        navigate(-1)
    }
    return ( 
        <div className="newblog-main"style={{backgroundColor: theme.drop, color: theme.syntax}}>
            <button onClick={goback} style={{backgroundColor: theme.drop, color: theme.syntax}} className='back'>&times;</button>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                style={{backgroundColor: theme.bg, color: theme.syntax}}
                placeholder="Blog title"
                required 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                 />
                 <textarea 
                 style={{backgroundColor: theme.bg, color: theme.syntax}}
                 required  
                 value={body}
                 onChange={(e) => setBody(e.target.value)}
                 placeholder='your blog here'  
                 cols="30" rows="12"
                 ></textarea>
                  {!isPending && <button style={{backgroundColor: theme.bg, color: theme.syntax}}>post</button>}
                  {isPending && <button style={{backgroundColor: theme.bg, color: theme.syntax}} disabled>posting ...</button>}
            </form>
        </div>
     );
}
 
export default Newblog;