import { ThemeContext } from "../contexts/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Booklist = (prop) => {
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;
    const [author, setAuthor] = useState();

    useEffect(() => {
        // console.log("book.js")
    }, [prop.authorid]);

    return (
        <Link
            className="booka"
            to={"/listview/" + prop.id}
            state={{
                oneblogId: prop.id,
                blogBody: prop.body,
                blogTitle: prop.title,
                ownerId: prop.authorid,
                author: prop.author,
                blogTime: prop.createdAt,
            }}
        >
            <div
                className="book"
                style={{ backgroundColor: theme.bg, color: theme.syntax }}
            >
                <h3>{prop.title}</h3>
                <p>{prop.body.substring(0, 100) + "  . . ."}</p>
                <div className="book-info">
                    <span className="time">{prop.createdAt}</span>
                    <span> ~ {prop.author}</span>
                </div>
            </div>
        </Link>
    );
};

export default Booklist;
