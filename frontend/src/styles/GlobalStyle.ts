import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: 'Arial', sans-serif;
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};
    }

    * {
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    button {
        cursor: pointer;
        border: none;
        outline: none;
    }
`;

export default GlobalStyle;
