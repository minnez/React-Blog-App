import '@testing-library/jest-dom/extend-expect'
import { render,screen,fireEvent } from "@testing-library/react";
import UserCard from '../components/UserCard'
import ThemeContextProvider from '../contexts/ThemeContext';
import BlogContextProvider from '../contexts/BlogContext';
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { BrowserRouter } from "react-router-dom";

const MockedComponent = ({pid, pname}) =>{
    const { isLightTheme, light, dark } = useContext(ThemeContext)
    const theme = isLightTheme ? light : dark;

    return (
        <BrowserRouter>
        <UserCard style={{backgroundColor: theme.bg, color: theme.syntax}}
            pid={pid}
            pname={pname}
        />
        </BrowserRouter>
    )   
}


describe("<UserCard /> test",() =>{
    it('should render name of the user', () =>{
        render(
        <ThemeContextProvider>
            <BlogContextProvider>
            <MockedComponent 
                pid={"3"}
                pname={"mike"}
            />
            </BlogContextProvider>
        </ThemeContextProvider>
        )
        const username = screen.getByText(/mike/i)
        expect(username).toBeInTheDocument();
    })
    it('should change follow to following when user clicks on it', () =>{
        render(
        <ThemeContextProvider>
            <BlogContextProvider>
            <MockedComponent 
                pid={"3"}
                pname={"mike"}
            />
            </BlogContextProvider>
        </ThemeContextProvider>
        )
        const followbutton = screen.getByRole("button", {name: /follow/i})
        fireEvent.click(followbutton)
        const showfollowing = screen.getByRole("button", {name: /following/i})
        expect(followbutton).not.toBeVisible();
        expect(showfollowing).toBeVisible()
    })
})