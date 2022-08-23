//

import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render,screen,waitFor } from "@testing-library/react";
import ThemeContextProvider from '../contexts/ThemeContext';
import Profile from '../navigation/Profile';
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Usercontext } from '../contexts/Usercontext';
import UsercontextProvider from '../contexts/Usercontext';
import { BrowserRouter } from "react-router-dom";
// import data from './data.json'

const MockedComponent = () =>{
    const { isLightTheme, light, dark } = useContext(ThemeContext)
    const theme = isLightTheme ? light : dark;
    const {logout,profile,fetchProfileDetails,profileDetails } = useContext(Usercontext)


    return (
        <BrowserRouter>
            <Profile 
                style={{backgroundColor: theme.bg, color: theme.syntax}} />
        </BrowserRouter>
    )
        
}

describe("<Profile /> test",() =>{

    it('should display the logout button', async () =>{
        render(
        <ThemeContextProvider>
            <UsercontextProvider>
                <MockedComponent   />
            </UsercontextProvider>
        </ThemeContextProvider>
        )
        const logoutbutton = screen.getByRole("button", {name: /logout/i})
        await waitFor(() => {
            expect(logoutbutton).toBeInTheDocument;
        })
       

    })

    it('should log out when logout is clicked', async () =>{
        render(
        <ThemeContextProvider>
            <UsercontextProvider>
                <MockedComponent   />
            </UsercontextProvider>
        </ThemeContextProvider>
        )
        // const username = await screen.getByText(/following/i)
        const logoutbutton = screen.getByRole("button", {name: /logout/i})
        fireEvent.click(logoutbutton)
        expect(logoutbutton).not.toBeInTheDocument;

    })
})