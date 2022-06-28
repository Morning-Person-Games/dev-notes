import { Global, css } from "@emotion/react";
import { lighten } from "polished";

const theme = {
  colors: {
    background: "rgb(16, 18, 38)",
    primary: "",
    secondary: "",
    dark: "#141624",
    white: "#f2f2f2",
    gray: "#b0b0b6",
    inactive: "#6A6D7A",
    error: "#d93434",
    border: "#2b315f",
    highlight: "#6C7BCC",
    highlightHover: "#444D80",
    yellow: "#EFFF54",
    highlightYellow: "#77802A",
    blue: "#323080",
    purple: "#2f2e6b",
    hover: "#37367d",
  },
  sizes: {
    radius: "5px",
    smMaxHeight: "150px",
    smCol: "300px",
    smColText: "290px",
    colWidth: "",
  },
  baseTypes: {
    baseInput: "",
    baseBtn: "",
    baseLink: "",
    baseRichText: "",
  },
};
const { colors } = theme;
colors.primary = lighten("0.11", colors.background);
colors.secondary = lighten("0.06", colors.background);

const globals = (
  <Global
    styles={css`
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
          "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
          "Helvetica Neue", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 16px;
        background-color: ${colors.background};
        margin: 5px auto;
        padding: 0;
      }
      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
          monospace;
      }
      p,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      li {
        color: ${theme.colors.white};
      }

      button {
        cursor: pointer;
      }

      ::-webkit-scrollbar-track {
        border-radius: ${theme.sizes.radius};
        background-color: ${theme.colors.secondary};
      }

      ::-webkit-scrollbar {
        width: 8px;
        height: 6px;
      }

      ::-webkit-scrollbar-thumb {
        border-radius: ${theme.sizes.radius};
        background-color: ${theme.colors.primary};
      }
      :focus-visible {
        outline: none;
      }
    `}
  />
);

theme.baseTypes.baseInput = `display: block;
padding: 10px;
background: ${theme.colors.primary};
border: none;
color: ${theme.colors.white};
flex-grow: 1;
&::placeholder {
  color: ${theme.colors.gray};
}`;

theme.baseTypes.baseBtn = `
transition: all 100ms ease-in;
-webkit-transition: all 100ms ease-in;
border: 0;
background-color: ${theme.colors.blue};
padding: 8px;
font-size: 1em;
color: ${theme.colors.white};
border-radius: ${theme.sizes.radius};
&:hover{
  background-color: ${theme.colors.hover};
}
&:disabled {
  color: ${theme.colors.gray};
  background-color: ${theme.colors.primary};
  cursor: default;
}`;
theme.baseTypes.baseLink = `
color: ${theme.colors.highlight};
&:link {
  color: ${theme.colors.highlight};
}
&:visited {
  color: ${theme.colors.highlight};
}
&:hover {
  color: ${theme.colors.highlightHover};
}
&:active {
  color: ${theme.colors.highlightHover};
}`;

theme.baseTypes.baseRichText = `
  p {
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
  }
  a {
    ${theme.baseTypes.baseLink};
  }`;

theme.sizes.colWidth = `width: ${theme.sizes.smCol}`;

export { theme, globals };
