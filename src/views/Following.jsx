import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import Usercard from "../components/UserCard";
import "../styles/follow.css";
import { ThemeContext } from "../contexts/ThemeContext";
import { useEffect, useState, useContext } from "react";

const Following = () => {
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;

    // console.log("following");
    const navigate = useNavigate();
    const location = useLocation();
    const { following, followers, returnPath } = location.state;
    const [newArray, setNewArray] = useState();

    const goback = () => {
        navigate(returnPath);
    };

    useEffect(() => {
        let newarray = [];

        for (let i = following.length - 1; i >= 0; i--) {
            newarray.push(following[i]);
        }
        setNewArray(newarray);
    }, []);

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
                    state={{
                        following: following,
                        followers: followers,
                        returnPath: returnPath,
                    }}
                >
                    following
                </Link>
                <Link
                    to={"/followers"}
                    state={{
                        followers: followers,
                        following: following,
                        returnPath: returnPath,
                    }}
                >
                    followers
                </Link>
            </div>
            {!newArray && <Loading> </Loading>}
            {newArray &&
                newArray.map((user) => (
                    <div
                        className="follow-card"
                        style={{ borderColor: theme.li }}
                        key={user.id}
                    >
                        <Usercard pid={user.id} pname={user.name} />
                    </div>
                ))}
            <div className="no-follow">
                {following.length === 0 && <div>No users to show .</div>}
            </div>
        </div>
    );
};

export default Following;
