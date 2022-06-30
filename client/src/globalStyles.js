import { Global, css } from "@emotion/react";
import { math, darken } from "polished";

// empty strings are set below just so I can hack intellisense a bit
const theme = {
  colors: {
    primary: "rgb(36, 40, 85)",
    white: "rgb(242, 242, 242)",
    inactiveColor: "rgb(176, 176, 182)",
    highlight: "rgb(75, 90, 205)",
    error: "rgb(217, 52, 52)",
    background: "rgb(16, 18, 38)",
    secondary: "",
    highlightHover: "",
    dark: "",
  },
  sizes: {
    radius: "5px",
    minHeight: "45px",
    smMaxHeight: "150px",
    screenSm: "320px",
    screenMd: "",
    screenXl: "",
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
colors.background = darken("0.13", colors.primary);
colors.secondary = darken("0.07", colors.primary);
colors.dark = darken("0.02", colors.background);
colors.highlightHover = darken("0.15", colors.highlight);

// sizes:
const { screenSm } = sizes;
sizes.smCol = math(screenSm + "- 20px");
sizes.mdCol = math(sizes.smCol + "* 1.5");
sizes.LgCol = math(sizes.smCol + "* 2");
sizes.screenMd = math(sizes.smCol + "* 2 + 30px");
sizes.screenLg = math("(" + sizes.mdCol + "* 2) + 50px");
sizes.screenXl = math("(" + sizes.LgCol + "* 2) + 50px");
sizes.maxWidth = math(sizes.screenLg + " - 40px");

sizes.colWidth = css`
  margin: 0 auto;
  padding: 0 10px;
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
    color: ${colors.inactiveColor};
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
    color: ${colors.inactiveColor};
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
      html {
        width: 100vw;
        overflow-x: hidden;
        font-size: 100%;
      }
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
