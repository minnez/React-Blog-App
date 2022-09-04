import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { Usercontext } from "../contexts/Usercontext";
import { useContext, useState } from "react";
import { IconButton } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import Alert from "@mui/material/Alert";
import "../styles/login.css";

const SignUp = () => {
    const { isLightTheme, light, dark, toggletheme } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;
    const { createUser, writeUserData } = useContext(Usercontext);

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setUsername] = useState("");
    const [namenotok, setUsernameok] = useState();
    const [password, setPassword] = useState("");
    const [confirmpassword, setcpassword] = useState("");
    const [error, setError] = useState("");
    const [isPending, setisPending] = useState(false);
    const [pwnok, setpwnok] = useState(false);

    // console.log("signup.js")

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        if (password !== confirmpassword) {
            if (name.length < 1) {
                setUsernameok(true);
            }
            setpwnok(true);
            setTimeout(() => {
                setpwnok(false);
            }, 4000);
        } else {
            try {
                setisPending(true);
                await createUser(email, password);
                await writeUserData(name, email);
                setisPending(false);
                // console.log("signed up")
                navigate("/");
            } catch (e) {
                setError(e.message);
                // console.log(e.message)
            }
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
            <h2>Sign Up</h2>
            <form style={{ backgroundColor: theme.bg, color: theme.syntax }}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="your email"
                    style={{ backgroundColor: theme.bg, color: theme.syntax }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="username">Name</label>
                <input
                    type="text"
                    id="username"
                    placeholder="your username"
                    style={{ backgroundColor: theme.bg, color: theme.syntax }}
                    value={name}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <div style={{ width: "96%" }}>
                    {namenotok && (
                        <Alert
                            sx={{
                                textAlign: "center",
                                color: "red",
                                border: "1px solid red",
                                padding: "0px 10px",
                                transition: "ease-out",
                            }}
                            severity="error"
                        >
                            Type a username
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
                {password.length > 0 && (
                    <div style={{ width: "96%" }}>
                        {password.length >= 8 && (
                            <Alert
                                sx={{
                                    textAlign: "center",
                                    color: "green",
                                    border: "1px solid green",
                                    padding: "0px 10px",
                                    transition: "ease-out",
                                }}
                                severity="success"
                            >
                                password okay
                            </Alert>
                        )}
                        {password.length < 8 && (
                            <Alert
                                sx={{
                                    textAlign: "center",
                                    color: "red",
                                    border: "1px solid red",
                                    padding: "0px 10px",
                                    transition: "ease-out",
                                }}
                                severity="error"
                            >
                                password weak
                            </Alert>
                        )}
                    </div>
                )}
                <label htmlFor="confirmpwd">confirm password</label>
                {password.length >= 8 && (
                    <input
                        type="password"
                        id="confirmpwd"
                        placeholder="password"
                        style={{
                            backgroundColor: theme.bg,
                            color: theme.syntax,
                        }}
                        value={confirmpassword}
                        onChange={(e) => setcpassword(e.target.value)}
                        required
                    />
                )}
                <div style={{ width: "96%", marginBottom: "20px" }}>
                    {pwnok && (
                        <Alert
                            sx={{
                                textAlign: "center",
                                color: "red",
                                border: "1px solid red",
                                padding: "0px 10px",
                                transition: "ease-out",
                            }}
                            severity="error"
                        >
                            password mismatch
                        </Alert>
                    )}
                </div>
                {/* {!isPending && <button disabled>Join the community</button>} */}
                {!isPending && confirmpassword.length >= 8 && (
                    <button onClick={handleSubmit}>Join the community</button>
                )}
                {isPending && (
                    <button onClick={handleSubmit} disabled>
                        joining...
                    </button>
                )}
                <span>
                    Already have an account?<Link to="/login">login here</Link>
                </span>
            </form>
        </div>
    );
};

export default SignUp;
