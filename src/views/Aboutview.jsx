import { useState } from "react";
import { useEffect, useContext } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { Usercontext } from "../contexts/Usercontext";
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import "../styles/aboutview.css";

const Aboutview = () => {
    const navigate = useNavigate();
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;
    const { profileDetails } = useContext(Usercontext);
    const { id } = useParams();
    const location = useLocation();
    const [aboutprofile, setaboutprofile] = useState();
    const [error, setError] = useState();

    const goback = () => {
        if (location.state && location.state.back.includes("listview")) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };
    const fetchProfileDetail = async () => {
        try {
            const docRef = doc(db, "profiles", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                // console.log(docSnap.data())
                setaboutprofile(docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                setError("No such document!");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        // console.log(location.state);
        if (profileDetails && profileDetails.userId === id) {
            setaboutprofile(profileDetails);
        } else {
            fetchProfileDetail();
        }
    }, [profileDetails, id]);

    return (
        <div
            className="aboutview-main"
            style={{ backgroundColor: theme.drop, color: theme.syntax }}
        >
            <button
                onClick={goback}
                style={{ backgroundColor: theme.drop, color: theme.syntax }}
                className="back"
            >
                &larr;
            </button>
            {!aboutprofile && <div className="loading">Loading...</div>}
            {aboutprofile && (
                <div className="about-profile">
                    <div className="about-profile-picture"></div>
                    <div className="about-name-email">
                        <div className="name">{aboutprofile.username}</div>
                        <div className="email">{aboutprofile.email}</div>
                    </div>
                    <div className="about-follows">
                        <Link
                            className="link-fix"
                            to={"/following"}
                            state={{
                                returnPath: location.pathname,
                                following: aboutprofile.following,
                                followers: aboutprofile.followers,
                            }}
                        >
                            <div className="f-n">
                                {aboutprofile.following.length}
                                <div className="f-l">&nbsp;Following</div>
                            </div>
                        </Link>
                        <Link
                            className="link-fix"
                            to={"/followers"}
                            state={{
                                returnPath: location.pathname,
                                followers: aboutprofile.followers,
                                following: aboutprofile.following,
                            }}
                        >
                            <div className="f-n">
                                {aboutprofile.followers.length}
                                <div className="f-l">&nbsp;Followers</div>
                            </div>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Aboutview;
