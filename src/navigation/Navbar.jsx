import { ThemeContext } from "../contexts/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Usercontext } from "../contexts/Usercontext";

const Navbar = () => {
    const { isLightTheme, light, dark, toggletheme } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;
    // console.log("navigation.js")

    const { profile, fetchProfileDetails, profileDetails } =
        useContext(Usercontext);

    const [showMobilenav, setShowmobilenav] = useState(true);

    useEffect(() => {
        window.onscroll = function (e) {
            // print "false" if direction is down and "true" if up
            // console.log(this.oldScroll > this.scrollY);
            setShowmobilenav(this.oldScroll > this.scrollY);
            this.oldScroll = this.scrollY;
        };
        // console.log("profile.jsx")
        fetchProfileDetails();
    }, [profile.uid]);

    return (
        <div
            className={`navbar ${!showMobilenav && "shownav"}`}
            style={{
                backgroundColor: theme.ui,
                color: theme.syntax,
                borderColor: theme.li,
            }}
        >
            <IconButton
                className="button"
                sx={{
                    backgroundColor: theme.bg,
                    color: theme.ui,
                    margin: "5px",
                }}
                onClick={toggletheme}
                size="medium"
            >
                {!isLightTheme && (
                    <LightModeOutlinedIcon
                        sx={{ color: "#ccc" }}
                        fontSize="small"
                    ></LightModeOutlinedIcon>
                )}
                {isLightTheme && (
                    <NightlightOutlinedIcon
                        sx={{ color: "#000" }}
                        fontSize="small"
                    ></NightlightOutlinedIcon>
                )}
            </IconButton>
            <div className="blog-name">
                <div style={{ fontWeight: "700" }}>MINNEZ BLOGS</div>
                <div
                    className="book-state"
                    style={{
                        backgroundColor: theme.bg,
                        color: theme.syntax,
                        fontSize: "12px",
                        fontWeight: "400",
                    }}
                >
                    {profileDetails && profileDetails.username}
                </div>
            </div>

            <div className="links">
                <Link
                    style={{ color: theme.syntax, marginLeft: "20px" }}
                    to="/"
                >
                    <IconButton
                        sx={{
                            backgroundColor: theme.bg,
                            color: theme.ui,
                            margin: "5px",
                        }}
                        size="medium"
                    >
                        <HomeOutlinedIcon
                            sx={{ color: theme.syntax }}
                            fontSize="medium"
                        ></HomeOutlinedIcon>
                    </IconButton>
                </Link>
                <Link
                    onClick={() =>
                        sessionStorage.setItem(
                            "scrollPosition",
                            window.pageYOffset
                        )
                    }
                    style={{ color: theme.syntax }}
                    to="/mb-user"
                >
                    <IconButton
                        className="menu"
                        sx={{
                            backgroundColor: theme.bg,
                            color: theme.ui,
                            margin: "5px",
                            height: "40px",
                        }}
                        size="medium"
                    >
                        <AccountCircleOutlinedIcon
                            sx={{ color: theme.syntax }}
                            fontSize="medium"
                        ></AccountCircleOutlinedIcon>
                    </IconButton>
                </Link>
                <Link
                    onClick={() =>
                        sessionStorage.setItem(
                            "scrollPosition",
                            window.pageYOffset
                        )
                    }
                    style={{ color: theme.syntax }}
                    to="/mb-user"
                >
                    <IconButton
                        className="menu"
                        sx={{
                            backgroundColor: theme.bg,
                            color: theme.ui,
                            margin: "5px",
                            height: "40px",
                        }}
                        size="medium"
                    >
                        <SearchOutlinedIcon
                            sx={{ color: theme.syntax }}
                            fontSize="medium"
                        ></SearchOutlinedIcon>
                    </IconButton>
                </Link>
            </div>
            {/* {profilee && <Profilemobile close={setprofilee} />}
            {searchuser && <SearchUsermobile close={setsearchuser} />} */}
        </div>
    );
};

export default Navbar;
