import { useLocation, useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
import { ThemeContext } from "../contexts/ThemeContext";
import { useEffect, useState, useContext } from "react";
import "../styles/liked.css";

const Liked = () => {
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;

    const navigate = useNavigate();
    const location = useLocation();
    // const { followers, following, returnPath } = location.state;
    const [newArray, setNewArray] = useState();

    const goback = () => {
        navigate(-1);
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
            <div className="liked">Liked by</div>

            <div>
                {!newArray && <div className="no-likes"> loading ...</div>}
                {newArray &&
                    newArray.map((user) => (
                        <div className="follow-card" key={user.id}>
                            <UserCard pid={user.id} pname={user.name} />
                        </div>
                    ))}
            </div>
            <div className="no-follow">
                {followers.length === 0 && <div>No likes yet .</div>}
            </div>
        </div>
    );
};

export default Liked;
