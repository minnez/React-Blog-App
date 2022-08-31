import { ThemeContext } from "../contexts/ThemeContext";
import { useContext, useEffect, useState } from "react";
import "../styles/profile.css";
import Image from "../images/pp.jpg";
import { Usercontext } from "../contexts/Usercontext";
import { useNavigate, Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const Profile = () => {
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;
    const { logout, profile, fetchProfileDetails, profileDetails, setUser } =
        useContext(Usercontext);
    const [error, setError] = useState();
    const [confirmationBox, setconfirmationBox] = useState(false);
    const navigate = useNavigate();

    const handlelogout = async () => {
        try {
            await logout();
            navigate("/login");
            // console.log("you are logged out")
        } catch (e) {
            setError(e.message);
        }
    };

    useEffect(() => {
        // console.log("profile.jsx")
        fetchProfileDetails();
    }, [profile.uid]);

    return (
        <div
            className="profile-main"
            style={{ backgroundColor: theme.drop, color: theme.syntax }}
        >
            {!profileDetails && <span>loading...</span>}
            {profileDetails && (
                <div className="flex-box">
                    <div className="profile-img">
                        <img
                            style={{
                                width: "100px",
                                height: "100px",
                                position: "relative",
                                top: "-5px",
                                left: "-5px",
                            }}
                            src={Image}
                            alt="efdffefdef"
                        />
                    </div>
                    <Link
                        className="underline link-fix"
                        to={"/aboutprofile/" + profileDetails.userId}
                    >
                        <h3 className="profile-name">
                            {profileDetails.username}
                        </h3>
                    </Link>
                    <div className="profile-email">{profileDetails.email}</div>
                    <div className="fol">
                        <Link
                            className="link-fix"
                            to={"/following"}
                            state={{
                                following: profileDetails.following,
                                followers: profileDetails.followers,
                                returnPath: "/",
                            }}
                        >
                            <div>
                                <span className="folNum">
                                    {profileDetails.following.length}
                                </span>{" "}
                                following
                            </div>
                        </Link>
                        <Link
                            className="link-fix"
                            to={"/followers"}
                            state={{
                                followers: profileDetails.followers,
                                following: profileDetails.following,
                                returnPath: "/",
                            }}
                        >
                            <div>
                                <span className="folNum">
                                    {profileDetails.followers.length}
                                </span>{" "}
                                followers
                            </div>
                        </Link>
                    </div>
                </div>
            )}

            <button
                onClick={() => setconfirmationBox(true)}
                style={{ backgroundColor: theme.bg, color: theme.syntax }}
            >
                logout
            </button>

            <Modal
                open={confirmationBox}
                onClose={() => setconfirmationBox(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        width: 200,
                        border: "0px",
                        outline: "0px",
                    }}
                >
                    <div className="confirmation-box">
                        <p>Continue to log out ?</p>
                        <div className="confirmation-btns">
                            <button
                                onClick={() => setconfirmationBox(false)}
                                className="btn cancel"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlelogout}
                                className="btn logout"
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default Profile;
