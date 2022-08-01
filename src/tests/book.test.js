import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render,screen } from "@testing-library/react";
import Book from '../components/Book'
import ThemeContextProvider from '../contexts/ThemeContext';
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { BrowserRouter } from "react-router-dom";

const MockedComponent = ({title, body,id, author}) =>{
    const { isLightTheme, light, dark } = useContext(ThemeContext)
    const theme = isLightTheme ? light : dark;

    return (
        <BrowserRouter>
        <Book style={{backgroundColor: theme.bg, color: theme.syntax}}
            title={title}
            body={body}
            id={id}
            author={author}
        />
        </BrowserRouter>
    )
        
}

describe("<Book /> test",() =>{
    it('should display the title and the main paragraph', () =>{
        render(
        <ThemeContextProvider>
            <MockedComponent 
                title={"my first title"}
                body={"lorem is a nice way to get paragraph"}
                id={"3"}
                author={"mark key"}
            />
        </ThemeContextProvider>
        )
        const title = screen.getByText(/my first title/i)
        const mainblog = screen.getByText(/lorem is a nice way to get paragraph/i)
        expect(title).toBeInTheDocument()
        expect(mainblog).toBeInTheDocument();
    })
   
})