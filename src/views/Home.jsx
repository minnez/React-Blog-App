import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Book from "../components/Book";
import Loading from "../components/Loading/Loading";
import { BlogContext } from "../contexts/BlogContext";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import Alert from "@mui/material/Alert";

const Home = () => {
    const { blogs, notify, delnotify } = useContext(BlogContext);
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;
    const [blogss, setBlogs] = useState([]);

    useEffect(() => {
        // const handleScroll = () => {
        //     sessionStorage.setItem("scrollPosition", window.pageYOffset);
        //     console.log("put");
        // };

        // window.addEventListener("scroll", handleScroll);

        // Remove listener when component unmounts
        // console.log("home.js")
        if (blogs) {
            // console.log(blogs);
            setBlogs(blogs);
            const scrollPosition = sessionStorage.getItem("scrollPosition");
            if (scrollPosition) {
                window.scrollTo(0, parseInt(scrollPosition, 10));
                sessionStorage.removeItem("scrollPosition");
            }
        }
    }, [blogs]);
    // useEffect(
    //     () => () => {
    //         const handleScroll = () => {
    //             sessionStorage.setItem("scrollPosition", window.pageYOffset);
    //         };
    //         console.log("unmount");
    //         window.removeEventListener("scroll", handleScroll);
    //     },
    //     []
    // );

    return (
        <div className="insidehome">
            <div
                style={{
                    backgroundColor: theme.drop,
                    paddingTop: "3px",
                    minHeight: "100%",
                }}
            >
                <div className="notify">
                    {notify && (
                        <Alert
                            icon={false}
                            sx={{
                                textAlign: "center",
                                color: "coral",
                                border: "1px solid coral",
                                padding: "10px 60px",
                                transition: "ease-out",
                            }}
                            severity="success"
                        >
                            Blog succesfully created
                        </Alert>
                    )}
                    {delnotify && (
                        <Alert
                            icon={false}
                            sx={{
                                textAlign: "center",
                                color: "coral",
                                border: "1px solid coral",
                                padding: "10px 60px",
                                transition: "ease-out",
                            }}
                            severity="error"
                        >
                            Deleted Blog succesfully
                        </Alert>
                    )}
                </div>
                {!blogs && <Loading></Loading>}
                {blogss.map((blog) => (
                    <Book
                        key={blog.id}
                        title={blog.title}
                        body={blog.body}
                        id={blog.id}
                        authorid={blog.profileID}
                        author={blog.profileName}
                        likes={blog.likes}
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
