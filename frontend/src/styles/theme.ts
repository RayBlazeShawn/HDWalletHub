import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
    colors: {
        primary: "#FFB800",
        background: "#121212",
        card: "#1E1E1E",
        text: "#FFFFFF",
        error: "#FF4D4F",
    },
    spacing: (factor: number) => `${8 * factor}px`,
};

export default theme;
