import { Global, css } from "@emotion/react";
import { math, darken, lighten, transparentize } from "polished";

// empty strings are set below just so I can hack intellisense a bit
const theme = {
  colors: {
    // Primary
    primary: "rgb(36, 40, 85)",
    // calculated
    white: "rgb(242, 242, 242)",
    gray: "rgb(136, 136, 142)",
    highlight: "rgb(49, 62, 164)",
    error: "rgb(255, 90, 85)",
    background: "rgb(16, 18, 38)",
    // special
    secondary: "",
    codeLine: "",
    codeBlock: "",
    link: "",
    // hidden
    placeholder: "",
    dark: "",
    linkHover: "",
    highlightHover: "",
    inactiveColor: "",
  },
  sizes: {
    radius: "5px",
    minHeight: "44px",
    smMaxHeight: "150px",
    screenSm: "",
    rtPadding: css`
      padding: 10px 10px 0 10px;
    `,
    screenMd: "",
    screenXl: "",
    smCol: "",
    mdCol: "",
    maxWidth: "",
    colWidth: "",
    font: {
      h6n: "0.67",
      h5n: "0.83",
      pn: "1",
      h4n: "1",
      default: "1em",
      h3n: "1.17",
      h2n: "1.5",
      h1n: "2",
      sm: "0.83em",
      md: "1em",
      lg: "1.17em",
      xl: "1.5em",
      xxl: "2em",
      fixedEm: (n) => n * 16 + "px",
    },
  },
  baseTypes: {
    baseFontSize: "16",
    clickable: "",
    baseInput: "",
    baseBtn: "",
    baseControl: "",
    baseLink: "",
    baseRichText: "",
    baseIconControl: "",
    hover: "",
  },
};
const { colors, sizes, baseTypes } = theme;
colors.inactiveColor = colors.gray;
colors.background = darken("0.13", colors.primary);
colors.secondary = darken("0.07", colors.primary);
colors.dark = darken("0.02", colors.background);
colors.highlightHover = lighten("0.1", colors.highlight);
colors.placeholder = lighten(0.15, colors.gray);
colors.link = lighten(0.2, colors.highlight);
colors.linkHover = darken(0.1, colors.link);
colors.codeBlock = colors.background;
colors.codeLine = transparentize(0.3, lighten(0.1, colors.primary));
// sizes:
sizes.screenSm = math(baseTypes.baseFontSize + "* 20px");
sizes.smCol = math(sizes.screenSm + "- 20px");
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
baseTypes.hover = "&:hover, &:active, &:focus, &:focus-visible";
baseTypes.baseInput = css`
  display: block;
  padding: 10px;
  background: ${colors.primary};
  border: none;
  color: ${colors.white};
  width: 100%;
  &::placeholder {
    color: ${colors.placeholder};
  }
`;

baseTypes.clickable = css`
  cursor: pointer;
  transition: all 100ms ease-in;
  -webkit-transition: all 100ms ease-in;
  border: 0;
  border-radius: ${sizes.radius};
  position: relative;
  svg {
    position: absolute;
  }
`;

baseTypes.baseBtn = css`
  ${baseTypes.clickable};
  background-color: ${colors.highlight};
  font-size: ${sizes.font.md};
  color: ${colors.white};
  ${baseTypes.hover} {
    background-color: ${colors.highlightHover};
  }
  &:disabled {
    color: ${colors.inactiveColor};
    background-color: ${colors.primary};
    cursor: default;
  }
`;
baseTypes.baseControl = css`
  ${baseTypes.clickable};
  background-color: ${colors.secondary};
  color: ${colors.white};
  padding: 5px 10px;
  position: relative;
  ${baseTypes.hover} {
    background-color: ${colors.primary};
  }
  &:disabled {
    background-color: ${colors.inactiveColor};
    cursor: default;
  }
`;
baseTypes.baseLink = css`
  color: ${colors.link};
  &:link {
    color: ${colors.link};
  }
  &:visited {
    color: ${colors.link};
  }
  ${baseTypes.hover} {
    color: ${colors.linkHover};
  }
`;
baseTypes.baseRichText = css`
  word-wrap: break-word;
  p {
    margin: 0;
    ${sizes.rtPadding};
  }
  font-size: 0.9rem;
  p {
    font-size: 1.1em;
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
    line-height: 1.2em;
    margin: 0;
    ${sizes.rtPadding};
  }

  a.anchor {
    margin-left: -27px;
  }
  ul {
    list-style-type: disc;
    padding-top: 0;
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
  code {
    background-color: ${colors.codeLine};
    border-radius: 6px;
    margin: 0;
    padding: 0.2em 0.4em;
  }
  pre {
    background-color: ${colors.codeBlock};
    border-radius: 6px;
    line-height: 1.45;
    margin-top: 10px;
    border-radius: 0;
    code {
      display: block;
      overflow: auto;
      padding: 15px;
      background-color: transparent;
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
        font-size: ${baseTypes.baseFontSize}px;
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
