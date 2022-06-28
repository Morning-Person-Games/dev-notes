import { Global, css } from "@emotion/react";

const theme = {
  colors: {
    primary: "#20243e",
    background: "#171A2B",
    black: "#131523",
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
  },
  baseTypes: {},
};

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
        background: ${theme.colors.background};
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
        border-radius: ${theme.sizes.radius}
        background-color: ${theme.colors.black};
      }

      ::-webkit-scrollbar {
        width: 8px;
        height: 6px;
      }

      ::-webkit-scrollbar-thumb {
        border-radius: ${theme.sizes.radius};
        background-color: ${theme.colors.black};
      }
      :focus-visible{
        outline: none;
      }
      .richText{
        p{
          margin-bottom: 5px;
        }
        a{
          &:link{
            color: ${theme.colors.highlight};
          }
          &:visited{
            color: ${theme.colors.highlight};
          }
          &:hover {
            color: ${theme.colors.highlightHover};
          }
          &:active{
            color: ${theme.colors.highlightHover};
          }
        }
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

theme.sizes.colWidth = `width: 300px;`;

export { theme, globals };
