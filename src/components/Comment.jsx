import { ThemeContext } from "../contexts/ThemeContext";
import { useContext, useState } from "react";
import '../styles/comment.css'
import { useNavigate } from "react-router-dom";

const Comments = ({close, blogid}) => {
    const navigate = useNavigate()
    const[body,setBody] = useState('')
    const[blogId,setblogid] = useState(Number(blogid))
    const[isPending, setisPending] = useState(false)

    const { isLightTheme, light, dark } = useContext(ThemeContext)
    const theme = isLightTheme ? light : dark;

    const handlesubmit = (e) =>{
        setblogid(blogid)
        console.log('commented')
        e.preventDefault();
        const blog = { body, blogId };
        setisPending(true)
        
        fetch("http://localhost:8000/comments",{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new blog added')
            setisPending(false)
            navigate(0)
            close()
        })
    }

    return ( 
        <div className="comments">
            <form onSubmit={handlesubmit} style={{backgroundColor: theme.bg, color: theme.syntax}}>
                <button data-testid="closecomment" className="close" onClick={close}style={{backgroundColor: theme.bg, color: theme.syntax}}>&times;</button>
                 <textarea 
                 style={{backgroundColor: theme.drop, color: theme.syntax}}
                 required  
                 value={body}
                 onChange={(e) => setBody(e.target.value)}
                 placeholder='your comment here'  
                 cols="25" rows="12"
                 ></textarea>
                  {!isPending && <button style={{backgroundColor: theme.bg, color: theme.syntax}}>comment</button>}
                  {isPending && <button style={{backgroundColor: theme.bg, color: theme.syntax}}>sending ...</button>}
            </form>
        </div>
     );
}
 
export default Comments;