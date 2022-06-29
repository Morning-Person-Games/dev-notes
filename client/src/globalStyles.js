import { Global, css } from "@emotion/react";
import { lighten, math, darken } from "polished";

// empty strings are set below just so I can hack intellisense a bit
const theme = {
  colors: {
    background: "rgb(16, 18, 38)",
    primary: "",
    secondary: "",
    white: "#f2f2f2",
    highlight: "rgb(75, 90, 205)",
    highlightHover: "",
    inactiveColor: "#6A6D7A",
    dark: "#141624",
    error: "#d93434",
    gray: "#b0b0b6",
    border: "#2b315f",
    yellow: "#EFFF54",
  },
  sizes: {
    radius: "5px",
    minHeight: "45px",
    smMaxHeight: "150px",
    screenSm: "320px",
    screenMd: "",
    screenLg: "",
    smCol: "",
    mdCol: "",
    maxWidth: "",
    colWidth: "",
  },
  baseTypes: {
    baseInput: "",
    baseBtn: "",
    baseLink: "",
    baseRichText: "",
  },
};
const { colors, sizes, baseTypes } = theme;
colors.primary = lighten("0.13", colors.background);
colors.secondary = lighten("0.06", colors.background);
colors.black = darken("0.05", colors.background);
colors.highlightHover = darken("0.15", colors.highlight);

// sizes:
const { screenSm } = sizes;
sizes.smCol = math(screenSm + "- 20px");
sizes.mdCol = math(screenSm + "* 1.5");
sizes.screenMd = math(sizes.mdCol + "+ 20px");
sizes.screenLg = math("(" + sizes.mdCol + "* 2) + 50px");
sizes.maxWidth = math(sizes.screenLg + " - 40px");

sizes.colWidth = css`
  margin: 0 auto;
  padding: 0 10px;
  @media screen and (min-width: ${sizes.screenMd}) {
    width: ${sizes.mdCol};
  }
  @media screen and (min-width: ${sizes.screenLg}) {
    padding: 0 20px;
    width: ${sizes.maxWidth};
  }
`;

// baseTypes:
baseTypes.baseInput = css`
  display: block;
  padding: 10px;
  background: ${colors.primary};
  border: none;
  color: ${colors.white};
  width: 100%;
  &::placeholder {
    color: ${colors.gray};
  }
`;

baseTypes.baseBtn = css`
  cursor: pointer;
  transition: all 100ms ease-in;
  -webkit-transition: all 100ms ease-in;
  border: 0;
  background-color: ${colors.highlight};
  padding: 8px;
  font-size: 1em;
  color: ${colors.white};
  border-radius: ${sizes.radius};
  &:hover {
    background-color: ${colors.highlightHover};
  }
  &:disabled {
    color: ${colors.gray};
    background-color: ${colors.primary};
    cursor: default;
  }
`;
baseTypes.baseLink = css`
  color: ${colors.highlight};
  &:link {
    color: ${colors.highlight};
  }
  &:visited {
    color: ${colors.highlight};
  }
  &:hover {
    color: ${colors.highlightHover};
  }
  &:active {
    color: ${colors.highlightHover};
  }
`;

baseTypes.baseRichText = css`
  p {
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
  }
  a {
    ${baseTypes.baseLink};
  }
`;

// globals:
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
        margin: 0;
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
        color: ${colors.white};
      }

      ::-webkit-scrollbar-track {
        border-radius: ${sizes.radius};
        background-color: ${colors.secondary};
      }

      ::-webkit-scrollbar {
        width: 8px;
        height: 6px;
      }

      ::-webkit-scrollbar-thumb {
        border-radius: ${sizes.radius};
        background-color: ${colors.primary};
      }
      :focus-visible {
        outline: none;
      }
    `}
  />
);

export { theme, globals };
