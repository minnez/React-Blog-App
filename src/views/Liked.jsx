import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import UserCard from "../components/UserCard";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import "../styles/liked.css";

const Liked = () => {
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;

    const navigate = useNavigate();
    const location = useLocation();
    const { likeslist } = location.state;

    const goback = () => {
        navigate(-1);
    };

    return (
        <div
            className="liked-main"
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
            <div style={{ borderColor: theme.li }} className="liked">
                Liked by
            </div>
            <div>
                {!likeslist && <Loading></Loading>}
                {likeslist &&
                    likeslist.map((user) => (
                        <div
                            className="like-card"
                            style={{ borderColor: theme.li }}
                            key={user.id}
                        >
                            <UserCard pid={user.id} pname={user.name} />
                        </div>
                    ))}
            </div>
            <div className="no-likes">
                {likeslist.length === 0 && <div>No likes yet .</div>}
            </div>
        </div>
    );
};

export default Liked;
