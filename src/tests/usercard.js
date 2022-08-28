import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import UserCard from "../components/UserCard";
import ThemeContextProvider from "../contexts/ThemeContext";
import UsercontextProvider from "../contexts/Usercontext";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Usercontext } from "../contexts/Usercontext";
import { BrowserRouter } from "react-router-dom";

const MockedComponent = ({ pid, pname }) => {
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;
    const { profile } = useContext(Usercontext);

    return (
        <BrowserRouter>
            <UserCard
                style={{ backgroundColor: theme.bg, color: theme.syntax }}
                pid={pid}
                pname={pname}
            />
        </BrowserRouter>
    );
};

describe("<UserCard /> test", () => {
    it("should render name of the user", () => {
        render(
            <ThemeContextProvider>
                <UsercontextProvider>
                    <MockedComponent pid={"3"} pname={"mike"} />
                </UsercontextProvider>
            </ThemeContextProvider>
        );
        const username = screen.getByText(/mike/i);
        expect(username).toBeInTheDocument();
    });
    it("should change follow to following when user clicks on it", () => {
        render(
            <ThemeContextProvider>
                <UsercontextProvider>
                    <MockedComponent pid={"3"} pname={"mike"} />
                </UsercontextProvider>
            </ThemeContextProvider>
        );
        const followbutton = screen.getByRole("button", { name: /follow/i });
        const username = screen.getByText(/mike/i);
        fireEvent.click(followbutton);
        expect(followbutton).not.toBeVisible();
        expect(username).not.toBeInTheDocument();
    });
});
