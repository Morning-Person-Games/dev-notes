import { Global, css } from "@emotion/react";
import { math, darken, lighten, transparentize } from "polished";
import defaultColors from "./defaultColors";

// empty strings are set below just so I can hack intellisense a bit
const theme = {
  colors: defaultColors,
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
    lgCol: "",
    maxWidth: "",
    colWidth: "",
    font: {
      defaultBaseSize: "16",
      baseSize: "",
      h6n: "0.67",
      h5n: "0.83",
      pn: "1",
      h4n: "1",
      default: "1em",
      h3n: "1.17",
      h2n: "1.5",
      h1n: "2",
      xs: "0.67em",
      sm: "0.83em",
      md: "1em",
      lg: "1.17em",
      xl: "1.5em",
      xxl: "2em",
      fixedEm: (n) => n * 16 + "px",
    },
  },
  baseTypes: {
    clickable: "",
    input: "",
    button: "",
    control: "",
    label: "",
    link: "",
    modalField: "",
    richText: "",
    iconControl: "",
    fieldHelperText: "",
    hover: "",
    tagsList: "",
    transitionSpeed: "100ms",
    transition:
      "transition: all 100ms ease-in; -webkit-transition: all 100ms ease-in;",
  },
  defaultFont: css`
    font-family: -apple-system, BlinkMacSystemFont, "Roboto", "Oxygen", "Ubuntu",
      "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  `,
  font: "",
};

// color calculations:
const { colors, sizes, baseTypes } = theme;
colors.white = colors.text;
colors.inactiveColor = colors.gray;
if (colors.background === "")
  colors.background = darken("0.13", colors.primary);
if (colors.secondary === "") colors.secondary = darken("0.07", colors.primary);
if (colors.dark === "") colors.dark = darken("0.02", colors.background);
if (colors.highlightHover === "")
  colors.highlightHover = lighten("0.1", colors.highlight);
if (colors.placeholder === "") colors.placeholder = lighten(0.15, colors.gray);
if (colors.link === "") colors.link = lighten(0.2, colors.highlight);
if (colors.linkHover === "") colors.linkHover = darken(0.1, colors.link);
if (colors.codeBlock === "") colors.codeBlock = colors.background;
if (colors.codeLine === "")
  colors.codeLine = transparentize(0.3, lighten(0.1, colors.primary));
if (colors.codeText === "") colors.codeText = colors.white;
colors.shadow = transparentize(0.4, "rgb(16, 18, 30)");

// sizes:
if (sizes.font.baseSize === "")
  sizes.font.baseSize = sizes.font.defaultBaseSize;
sizes.screenSm = math(sizes.font.baseSize + "* 20px"); // 320px - Each at default fontsize:
sizes.smCol = math(sizes.screenSm + "- 20px"); // 300px
sizes.mdCol = math(sizes.smCol + "* 1.5"); // 450px
sizes.lgCol = math(sizes.smCol + "* 2"); // 600px
sizes.screenMd = math(sizes.smCol + "* 2 + 30px"); // 630px
sizes.screenLg = math("(" + sizes.mdCol + "* 2) + 50px"); // 950px
sizes.screenXl = math("(" + sizes.lgCol + "* 2) + 50px"); // 1250px
sizes.maxWidth = math(sizes.screenLg + " - 40px"); // 910px
sizes.colWidth = css`
  margin: 0 auto;
  padding: 0 10px;
  @media screen and (min-width: ${sizes.screenLg}) {
    padding: 0 20px;
    width: ${sizes.maxWidth};
  }
`;

// font
if (theme.font === "") theme.font = theme.defaultFont;

// baseTypes aka fancy classes:
baseTypes.hover = "&:hover, &:active, &:focus, &:focus-visible";
baseTypes.input = css`
  display: block;
  padding: 10px;
  background: ${colors.primary};
  border: none;
  color: ${colors.white};
  width: 100%;
  border-radius: ${sizes.radius};
  &::placeholder {
    color: ${colors.placeholder};
  }
`;

baseTypes.fieldHelperText = css`
  display: block;
  max-width: ${sizes.mdCol};
  width: 100%;
  color: ${colors.placeholder};
  text-align: left;
  font-size: ${sizes.font.sm};
  min-height: 20px;
  margin: 0;
`;

baseTypes.modalField = css`
  ${baseTypes.input};
  ${baseTypes.transition};
  max-width: ${sizes.mdCol};
  font-size: ${sizes.font.lg};
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`;

baseTypes.label = css`
  font-size: ${sizes.font.md};
  color: ${colors.white};
  max-width: ${sizes.mdCol};
  width: 100%;
  font-weight: 700;
`;

baseTypes.clickable = css`
  cursor: pointer;
  transition: all ${baseTypes.transitionSpeed} ease-in;
  -webkit-transition: all ${baseTypes.transitionSpeed} ease-in;
  border: 0;
  border-radius: ${sizes.radius};
  position: relative;
  svg {
    position: absolute;
  }
`;

baseTypes.button = css`
  ${baseTypes.clickable};
  background-color: ${colors.highlight};
  font-size: ${sizes.font.md};
  color: ${colors.white};
  ${baseTypes.hover} {
    background-color: ${colors.highlightHover};
  }
  &:visited {
    color: ${colors.white};
  }
  &:disabled {
    color: ${colors.inactiveColor};
    background-color: ${colors.primary};
    cursor: default;
  }
`;
baseTypes.control = css`
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
baseTypes.link = css`
  transition: all ${baseTypes.transitionSpeed} ease-in;
  -webkit-transition: all ${baseTypes.transitionSpeed} ease-in;
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
baseTypes.tagsList = css`
  display: flex;
  flex-flow: row wrap;
  row-gap: 10px;
`;
baseTypes.richText = css`
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
    color: ${colors.codeText};
  }
  pre {
    box-shadow: inset 0 1px 6px -1px ${transparentize(0.4, colors.primary)};
    background-color: ${colors.codeBlock};
    line-height: 1.45;
    margin-top: 10px;
    border-radius: 0;
    color: ${colors.codeText};
    code {
      display: block;
      overflow: auto;
      padding: 15px;
      background-color: transparent;
    }
  }
  a {
    overflow-wrap: anywhere;
    ${baseTypes.link};
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
      html,
      body {
        ${theme.font};
      }
      html {
        width: 100vw;
        overflow-x: hidden;
        font-size: 100%;
      }
      body {
        font-size: ${sizes.font.baseSize}px;
        line-height: 1.5;
        background-color: ${colors.background};
        margin: 0;
      }
      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
          monospace;
      }
      a {
        ${baseTypes.link};
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
