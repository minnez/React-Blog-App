import { Link, useLocation, useNavigate } from "react-router-dom";
import Usercard from "../components/UserCard";
import "../styles/follow.css";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

const Following = () => {
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;

    // console.log("following");
    const navigate = useNavigate();
    const location = useLocation();
    const { following, followers } = location.state;
    console.log(following);

    const goback = () => {
        navigate(-1);
    };

    return (
        <div
            style={{ backgroundColor: theme.drop, color: theme.syntax }}
            className="follow-main"
        >
            <button
                onClick={goback}
                style={{
                    backgroundColor: theme.drop,
                    color: theme.syntax,
                    fontSize: "x-large",
                }}
                className="back"
            >
                &larr;
            </button>
            <div className="follow-links">
                <Link
                    className="active"
                    to={"/following"}
                    state={{ following: following, followers: followers }}
                >
                    following
                </Link>
                <Link
                    to={"/followers"}
                    state={{ followers: followers, following: following }}
                >
                    followers
                </Link>
            </div>
            {following.map((user) => (
                <div className="follow-card" key={user.id}>
                    <Usercard pid={user.id} pname={user.name} />
                </div>
            ))}
        </div>
    );
};

export default Following;
