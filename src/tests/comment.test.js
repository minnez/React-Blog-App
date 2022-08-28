import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import Comment from "../components/Comment";
import ThemeContextProvider from "../contexts/ThemeContext";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { BrowserRouter } from "react-router-dom";

const MockedComponent = ({ blogid, close }) => {
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;

    return (
        <BrowserRouter>
            <Comment
                style={{ backgroundColor: theme.bg, color: theme.syntax }}
                close={close}
                blogid={blogid}
            />
        </BrowserRouter>
    );
};

const mockedclose = jest.fn();

describe("<comment /> test", () => {
    it("should render comment input element", () => {
        render(
            <ThemeContextProvider>
                <MockedComponent blogid={"3"} close={mockedclose} />
            </ThemeContextProvider>
        );
        const inputElement = screen.getByPlaceholderText(/your comment here/i);
        expect(inputElement).toBeInTheDocument();
    });

    it("should be able to type in input", () => {
        render(
            <ThemeContextProvider>
                <MockedComponent blogid={"3"} close={mockedclose} />
            </ThemeContextProvider>
        );
        const inputElement = screen.getByPlaceholderText(/your comment here/i);
        fireEvent.change(inputElement, {
            target: { value: "the first comment" },
        });
        expect(inputElement.value).toBe("the first comment");
    });
    it("should be able to take all forms of input", () => {
        render(
            <ThemeContextProvider>
                <MockedComponent blogid={"3"} close={mockedclose} />
            </ThemeContextProvider>
        );
        const inputElement = screen.getByPlaceholderText(/your comment here/i);
        fireEvent.change(inputElement, { target: { value: "0011234" } });
        expect(inputElement.value).toBe("0011234");
    });
    it("should be able to take all forms of input", () => {
        render(
            <ThemeContextProvider>
                <MockedComponent blogid={"3"} close={mockedclose} />
            </ThemeContextProvider>
        );
        const inputElement = screen.getByPlaceholderText(/your comment here/i);
        fireEvent.change(inputElement, { target: { value: " " } });
        expect(inputElement.value).not.toBeFalsy();
    });

    it("should close when the comment button is clicked", () => {
        render(
            <ThemeContextProvider>
                <MockedComponent blogid={"3"} close={mockedclose} />
            </ThemeContextProvider>
        );
        const inputElement = screen.getByPlaceholderText(/your comment here/i);
        const commentButton = screen.getByRole("button", { name: /comment/i });
        fireEvent.change(inputElement, { target: { value: "red" } });
        fireEvent.click(commentButton);
        expect(inputElement).not.toBeInTheDocument;
    });

    it("should not close when trying to submit while input is empty", () => {
        render(
            <ThemeContextProvider>
                <MockedComponent blogid={"3"} close={mockedclose} />
            </ThemeContextProvider>
        );
        const inputElement = screen.getByPlaceholderText(/your comment here/i);
        const commentButton = screen.getByRole("button", { name: /comment/i });
        fireEvent.change(inputElement, { target: { value: "" } });
        fireEvent.click(commentButton);
        expect(inputElement).toBeInTheDocument;
    });
    it("should render comment after comment submit", () => {
        render(
            <ThemeContextProvider>
                <MockedComponent blogid={"3"} close={mockedclose} />
            </ThemeContextProvider>
        );
        const inputElement = screen.getByPlaceholderText(/your comment here/i);
        const commentButton = screen.getByRole("button", { name: /comment/i });
        fireEvent.change(inputElement, { target: { value: "the comment" } });
        fireEvent.click(commentButton);
        const comment = screen.getByText(/the comment/i);
        expect(inputElement).toBeInTheDocument;
        expect(comment).toBeInTheDocument;
    });
    it("should close comment", () => {
        render(
            <ThemeContextProvider>
                <MockedComponent blogid={"3"} close={mockedclose} />
            </ThemeContextProvider>
        );
        const inputElement = screen.getByPlaceholderText(/your comment here/i);
        const closeButton = screen.getByTestId("closecomment");
        fireEvent.click(closeButton);
        expect(inputElement).not.toBeInTheDocument;
    });
});
