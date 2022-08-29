import { Link, useLocation, useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
import { ThemeContext } from "../contexts/ThemeContext";
import { useEffect, useState, useContext } from "react";
import "../styles/follow.css";

const Followers = () => {
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;

    const navigate = useNavigate();
    const location = useLocation();
    const { followers, following, returnPath } = location.state;
    const [newArray, setNewArray] = useState();

    const goback = () => {
        navigate(returnPath);
    };

    useEffect(() => {
        let newarray = [];

        for (let i = followers.length - 1; i >= 0; i--) {
            newarray.push(followers[i]);
        }
        setNewArray(newarray);
    }, []);

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
                    state={{
                        following: following,
                        followers: followers,
                        returnPath: returnPath,
                    }}
                >
                    following
                </Link>
                <Link
                    className="active"
                    to={"/followers"}
                    state={{
                        following: following,
                        followers: followers,
                        returnPath: returnPath,
                    }}
                >
                    followers
                </Link>
            </div>

            <div>
                {!newArray && <div className="no-follow"> loading ...</div>}
                {newArray &&
                    newArray.map((user) => (
                        <div
                            className="follow-card"
                            key={user.id}
                            style={{ borderBottom: "1px solid grey" }}
                        >
                            <UserCard pid={user.id} pname={user.name} />
                        </div>
                    ))}
            </div>
            <div className="no-follow">
                {followers.length === 0 && <div>No users to show .</div>}
            </div>
        </div>
    );
};

export default Followers;
