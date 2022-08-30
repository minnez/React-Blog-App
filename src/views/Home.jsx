import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Book from "../components/Book";
import { BlogContext } from "../contexts/BlogContext";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
const Home = () => {
    const { blogs } = useContext(BlogContext);
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;
    const [blogss, setBlogs] = useState([]);

    useEffect(() => {
        // console.log("home.js")
        if (blogs) {
            console.log(blogs);
            setBlogs(blogs);
        }
    }, [blogs]);

    return (
        <div className="insidehome">
            <div
                style={{
                    backgroundColor: theme.drop,
                    paddingTop: "3px",
                    minHeight: "100%",
                }}
            >
                {blogss.map((blog) => (
                    <Book
                        key={blog.id}
                        title={blog.title}
                        body={blog.body}
                        id={blog.id}
                        authorid={blog.profileID}
                        author={blog.profileName}
                        createdAt={blog.createdAt
                            .toDate()
                            .toString()
                            .substring(0, 21)}
                    />
                ))}
            </div>
            <Link className="addpost" to="/addblog">
                <IconButton
                    sx={{
                        backgroundColor: "coral",
                        color: "#fff",
                        margin: "8px",
                    }}
                    size="large"
                >
                    <PostAddOutlinedIcon
                        sx={{ color: "#fff" }}
                        fontSize="medium"
                    ></PostAddOutlinedIcon>
                </IconButton>
            </Link>
        </div>
    );
};

export default Home;
