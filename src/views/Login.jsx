import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { Usercontext } from "../contexts/Usercontext";
import { useContext, useState } from "react";
import { IconButton } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import "../styles/login.css";
const Login = () => {
    const { isLightTheme, light, dark, toggletheme } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;

    const { signIn } = useContext(Usercontext);

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();
    const [isPending, setisPending] = useState(false);

    // console.log("login.js")

    const handlelogin = async (e) => {
        e.preventDefault();
        setisPending(true);
        setError("");
        try {
            await signIn(email, password);
            navigate("/");
            // console.log("logged in")
        } catch (e) {
            setError(e.message);
            // console.log(e.message)
            setisPending(false);
        }
    };

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
                {!isPending && <button onClick={handlelogin}>Login</button>}
                {isPending && (
                    <button onClick={handlelogin} disabled>
                        . . .
                    </button>
                )}
                <span>
                    Don't have an account?<Link to="/signup">sign up here</Link>
                </span>
            </form>
        </div>
    );
};

export default Login;
