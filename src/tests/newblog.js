import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render,screen } from "@testing-library/react";
import Newblog from '../views/Newblog'
import ThemeContextProvider from '../contexts/ThemeContext';
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { BlogContext } from "../contexts/BlogContext";
import { BrowserRouter } from 'react-router-dom';

const MockedComponent = () =>{
    const { isLightTheme, light, dark } = useContext(ThemeContext)
    const theme = isLightTheme ? light : dark;
    const { getPosts } = useContext(BlogContext)

    return (
        <BrowserRouter>
            <Newblog style={{backgroundColor: theme.bg, color: theme.syntax}}
            />
        </BrowserRouter>
    )
        
}

describe("<Newblog /> test",() =>{

    it('should render form input elements', () =>{
        render(
        <ThemeContextProvider>
            <MockedComponent 
            />
        </ThemeContextProvider>
        )
        const inputElement1 = screen.getByPlaceholderText(/blog title/i)
        const inputElement2 = screen.getByPlaceholderText(/your blog here/i)
        expect(inputElement1).toBeInTheDocument();
        expect(inputElement2).toBeInTheDocument();
    })

    it('should be able to type in inputs', () =>{
        render(
        <ThemeContextProvider>
            <MockedComponent 
            />
        </ThemeContextProvider>
        )
        const inputElement1 = screen.getByPlaceholderText(/blog title/i)
        const inputElement2 = screen.getByPlaceholderText(/your blog here/i)
        fireEvent.change(inputElement1, { target: { value: "the title"}})
        fireEvent.change(inputElement2, { target: { value: "the body"}})
        expect(inputElement1.value).toBe("the title");
        expect(inputElement2.value).toBe("the body");
    })
    
    it('should not post when  inputs are empty', () =>{
        render(
        <ThemeContextProvider>
            <MockedComponent 
            />
        </ThemeContextProvider>
        )
        const inputElement1 = screen.getByPlaceholderText(/blog title/i)
        const inputElement2 = screen.getByPlaceholderText(/your blog here/i)
        const closeButton = screen.getByTestId("closenewblog")
        fireEvent.click(closeButton)
        expect(inputElement1).not.toBeInTheDocument;
        expect(inputElement2).not.toBeInTheDocument;
    })
   
})