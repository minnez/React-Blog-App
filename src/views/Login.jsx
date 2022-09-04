import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { Usercontext } from "../contexts/Usercontext";
import { useContext, useState } from "react";
import { IconButton } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import Alert from "@mui/material/Alert";
import "../styles/login.css";
import { useEffect } from "react";
const Login = () => {
    const { isLightTheme, light, dark, toggletheme } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;

    const { signIn, profile } = useContext(Usercontext);

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidpassword, setInvalidPassword] = useState();
    const [inavlidemail, setInvalidEmail] = useState();
    const [notFound, setNotFound] = useState();
    const [noNetwork, setNoNetwork] = useState();
    const [tryLater, setTryLater] = useState();
    const [isPending, setisPending] = useState(false);

    // console.log("login.js")

    const handlelogin = async (e) => {
        e.preventDefault();
        setisPending(true);
        try {
            await signIn(email, password);
            navigate("/");
            // console.log("logged in")
        } catch (e) {
            // console.log(e.message);
            if (e.message.includes("auth/network-request-failed")) {
                setNoNetwork(true);
            }
            if (e.message.includes("auth/too-many-requests")) {
                setTryLater(true);
            }
            if (e.message.includes("auth/invalid-email")) {
                setInvalidEmail(true);
            }
            if (e.message.includes("auth/wrong-password")) {
                setInvalidPassword(true);
            }
            if (e.message.includes("auth/user-not-found")) {
                setNotFound(true);
            }
            // console.log(e.message)
            setisPending(false);
        }
    };

    useEffect(() => {
        if (profile) {
            navigate("/");
        }
    });

    return (
        <div
            className="login"
            style={{ backgroundColor: theme.bg, color: theme.syntax }}
        >
            <IconButton
                sx={{
                    backgroundColor: theme.syntax,
                    color: theme.ui,
                    margin: "5px",
                }}
                onClick={toggletheme}
                size="medium"
            >
                {!isLightTheme && (
                    <LightModeOutlinedIcon fontSize="medium"></LightModeOutlinedIcon>
                )}
                {isLightTheme && (
                    <NightlightOutlinedIcon fontSize="medium"></NightlightOutlinedIcon>
                )}
            </IconButton>
            <div style={{}}>
                {noNetwork && (
                    <Alert
                        onClose={() => setNoNetwork(false)}
                        sx={{
                            textAlign: "center",
                            color: "red",
                            border: "1px solid red",
                            padding: "0px 10px",
                            transition: "ease-out",
                        }}
                        severity="error"
                    >
                        Check your internet connection
                    </Alert>
                )}
                {tryLater && (
                    <Alert
                        onClose={() => setTryLater(false)}
                        sx={{
                            textAlign: "center",
                            color: "red",
                            border: "1px solid red",
                            padding: "0px 10px",
                            transition: "ease-out",
                        }}
                        severity="error"
                    >
                        Too many Login attempts . Try again later
                    </Alert>
                )}
            </div>
            <h2>Login here</h2>
            <form style={{ backgroundColor: theme.bg, color: theme.syntax }}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    placeholder="your email"
                    style={{ backgroundColor: theme.bg, color: theme.syntax }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <div style={{ width: "96%", marginBottom: "20px" }}>
                    {inavlidemail && (
                        <Alert
                            onClose={() => setInvalidEmail(false)}
                            sx={{
                                textAlign: "center",
                                color: "red",
                                border: "1px solid red",
                                padding: "0px 10px",
                                transition: "ease-out",
                            }}
                            severity="error"
                        >
                            invalid email
                        </Alert>
                    )}
                    {notFound && (
                        <Alert
                            onClose={() => setNotFound(false)}
                            sx={{
                                textAlign: "center",
                                color: "red",
                                border: "1px solid red",
                                padding: "0px 10px",
                                transition: "ease-out",
                            }}
                            severity="error"
                        >
                            User not found
                        </Alert>
                    )}
                </div>
                <label htmlFor="pwd">Password</label>
                <input
                    type="password"
                    id="pwd"
                    placeholder="password"
                    style={{ backgroundColor: theme.bg, color: theme.syntax }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div style={{ width: "96%", marginBottom: "20px" }}>
                    {invalidpassword && (
                        <Alert
                            onClose={() => setInvalidPassword(false)}
                            sx={{
                                textAlign: "center",
                                color: "red",
                                border: "1px solid red",
                                padding: "0px 10px",
                                transition: "ease-out",
                            }}
                            severity="error"
                        >
                            wrong password
                        </Alert>
                    )}
                </div>
                {!isPending && (
                    <button className="log-btn" onClick={handlelogin}>
                        Login
                    </button>
                )}
                {isPending && (
                    <button className="log-btn" onClick={handlelogin} disabled>
                        . . .
                    </button>
                )}
                <span>
                    Don't have an account?{" "}
                    <Link to="/signup">sign up here</Link>
                </span>
            </form>
        </div>
    );
};

export default Login;
