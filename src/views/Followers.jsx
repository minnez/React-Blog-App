import { Link, useLocation, useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import "../styles/follow.css";

const Followers = () => {
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;

    const navigate = useNavigate();
    const location = useLocation();
    const { followers, following } = location.state;
    console.log(followers);

    const goback = () => {
        navigate(-1);
    };
    return (
        <div
            className="follow-main"
            style={{ backgroundColor: theme.drop, color: theme.syntax }}
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
                    to={"/following"}
                    state={{ following: following, followers: followers }}
                >
                    following
                </Link>
                <Link
                    className="active"
                    to={"/followers"}
                    state={{ following: following, followers: followers }}
                >
                    followers
                </Link>
            </div>

            <div>
                {followers.map((user) => (
                    <div
                        className="follow-card"
                        key={user.id}
                        style={{ borderBottom: "1px solid grey" }}
                    >
                        <UserCard pid={user.id} pname={user.name} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Followers;
