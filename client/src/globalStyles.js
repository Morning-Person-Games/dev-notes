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
    codeLine: "",
    codeBlock: "",
  },
  sizes: {
    radius: "5px",
    minHeight: "45px",
    smMaxHeight: "150px",
    screenSm: "320px",
    rtPadding: css`
      padding: 10px 10px 0 10px;
    `,
    screenMd: "",
    screenXl: "",
    smCol: "",
    mdCol: "",
    maxWidth: "",
    colWidth: "",
  },
  baseTypes: {
    baseFontSize: "16",
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
    ${sizes.rtPadding};
  }
  font-size: 1rem;
  .wmde-markdown {
    width: 100%;
    font-size: 1rem;
    p {
      font-size: 1em;
    }
    h1,
    h2 {
      border: 0;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.5rem;
      margin: 5px 0 10px 0;
      ${sizes.rtPadding};
    }
    a.anchor {
      margin-left: -27px;
    }
    ul {
      list-style-type: disc;
      padding-top: 10px;
    }
    li {
      padding-top: 10px;
    }
    pre {
      margin: 10px 0 0 0;
    }
    hr {
      border: none;
      height: 3px;
      margin: 1em 0;
      background-color: ${colors.primary};
    }
  }
  a {
    overflow-wrap: anywhere;
    ${baseTypes.baseLink};
  }
  &:not(:last-child) {
    padding-bottom: 10px;
    border-bottom: 2px solid ${colors.primary};
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
        font-size: ${baseTypes.baseFontSize} + "px";
        line-height: 1.5;
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
