import "./styles/App.css";
import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Listview from "./views/Listview";
import Aboutview from "./views/Aboutview";
import Following from "./views/Following";
import Followers from "./views/Followers";
import ThemeContextProvider from "./contexts/ThemeContext";
import Authenticated from "./Authenticated";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Newblog from "./views/Newblog";
import Liked from "./views/Liked";
import UsercontextProvider from "./contexts/Usercontext";
import Alert from "@mui/material/Alert";

function App() {
    // Online state
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        // Update network status
        const handleStatusChange = () => {
            setIsOnline(navigator.onLine);
        };

        // Listen to the online status
        window.addEventListener("online", handleStatusChange);

        // Listen to the offline status
        window.addEventListener("offline", handleStatusChange);

        // Specify how to clean up after this effect for performance improvment
        return () => {
            window.removeEventListener("online", handleStatusChange);
            window.removeEventListener("offline", handleStatusChange);
        };
    }, [isOnline]);

    return (
        <Router>
            {!isOnline && (
                <div className="no-connection">
                    <Alert
                        sx={{
                            textAlign: "center",
                            color: "red",
                            border: "1px solid red",
                            padding: "10px 20px",
                            transition: "ease-out",
                            width: "fit-content",
                        }}
                        severity="error"
                    >
                        check your internet connection
                    </Alert>
                </div>
            )}
            <div className="App">
                <div style={{ height: "100vh" }}>
                    <ThemeContextProvider>
                        <UsercontextProvider>
                            <Routes basename="/minnez-blog-app.netlify.app">
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<SignUp />} />
                                <Route element={<Authenticated />}>
                                    <Route exact path="/" element={<Home />} />
                                    <Route
                                        exact
                                        path="/addblog"
                                        element={<Newblog />}
                                    />
                                    <Route
                                        path="/listview/:id"
                                        element={<Listview />}
                                    />
                                    <Route
                                        exact
                                        path="/aboutprofile/:id"
                                        element={<Aboutview />}
                                    />
                                    <Route
                                        exact
                                        path="/following"
                                        element={<Following />}
                                    />
                                    <Route
                                        exact
                                        path="/followers"
                                        element={<Followers />}
                                    />
                                    <Route
                                        exact
                                        path="/likes/:id"
                                        element={<Liked />}
                                    />
                                </Route>
                            </Routes>
                        </UsercontextProvider>
                    </ThemeContextProvider>
                </div>
            </div>
        </Router>
    );
}

export default App;
