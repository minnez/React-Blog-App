import { ThemeContext } from "../contexts/ThemeContext";
import { useContext, useEffect, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
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
                likes: prop.likes,
            }}
        >
            <div
                className="book"
                style={{
                    backgroundColor: theme.drop,
                    color: theme.syntax,
                    borderColor: theme.li,
                }}
            >
                <h3>{prop.title}</h3>
                <p>{prop.body.substring(0, 100) + "  . . ."}</p>
                <div className="book-info">
                    <span className="time">{prop.createdAt}</span>
                    <span> ~ {prop.author}</span>
                </div>
                <div
                    style={{ backgroundColor: theme.bg, color: theme.li }}
                    className="book-state"
                >
                    <span style={{ color: theme.syntax }}>
                        {prop.likes.length}
                    </span>
                    <FavoriteBorderOutlinedIcon
                        sx={{ color: "coral" }}
                        fontSize="small"
                    ></FavoriteBorderOutlinedIcon>
                </div>
            </div>
        </Link>
    );
};

export default Booklist;
