import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render,screen } from "@testing-library/react";
import ThemeContextProvider from '../contexts/ThemeContext';
import Profile from '../navigation/Profile';
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { BlogContext } from '../contexts/BlogContext';
import BlogContextProvider from '../contexts/BlogContext';
import { BrowserRouter } from "react-router-dom";
// import data from './data.json'

const MockedComponent = () =>{
    const { isLightTheme, light, dark } = useContext(ThemeContext)
    const theme = isLightTheme ? light : dark;
    const {name, following, followers } = useContext(BlogContext)


    return (
        <BrowserRouter>
            <Profile 
                name={name} following={following} followers={followers}
                style={{backgroundColor: theme.bg, color: theme.syntax}} />
        </BrowserRouter>
    )
        
}

describe("<Profile /> test",() =>{
    it('should display name of logged in user', async () =>{
        render(
        <ThemeContextProvider>
            <BlogContextProvider>
                <MockedComponent   />
            </BlogContextProvider>
        </ThemeContextProvider>
        )
        const title = await screen.getByText(/rick/i)
        // const mainblog = screen.getByText(/lorem is a nice way to get paragraph/i)
        expect(title).toBeInTheDocument()
        // expect(mainblog).toBeInTheDocument();
    })

    it('should display the logout button', async () =>{
        render(
        <ThemeContextProvider>
            <BlogContextProvider>
                <MockedComponent   />
            </BlogContextProvider>
        </ThemeContextProvider>
        )
        const logoutbutton = screen.getByRole("button", {name: /logout/i})
        expect(logoutbutton).toBeInTheDocument;

    })

    it('should log out when logout is clicked', async () =>{
        render(
        <ThemeContextProvider>
            <BlogContextProvider>
                <MockedComponent   />
            </BlogContextProvider>
        </ThemeContextProvider>
        )
        const username = await screen.getByText(/rick/i)
        const logoutbutton = screen.getByRole("button", {name: /logout/i})
        fireEvent.click(logoutbutton)
        expect(username).not.toBeInTheDocument;

    })
})