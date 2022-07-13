import { css } from "@emotion/react";
import { mixins } from "./globalStyles";
import defaultColors from "./defaultColors";

function formattedThemePreview(palette, count) {
  return css`
    .select__option:nth-of-type(${count}) {
      ${mixins.preview(palette)};
    }
  `;
}

function formatThemesList(themes) {
  const themesObject = {
    themes: [{ title: "Default", theme: defaultColors }],
    previewStyles: [formattedThemePreview(defaultColors, 1)],
    options: [{ value: "Default", label: "Default" }],
  };
  for (let i = 0; i < themes.length; i++) {
    themesObject.themes.push({ title: themes[i].title, theme: themes[i] });
    themesObject.previewStyles.push(formattedThemePreview(themes[i], i + 2));
    themesObject.options.push({
      value: themes[i].title,
      label: themes[i].title,
    });
  }
  return themesObject;
}

/*
const defaultColors = {
  // Core   colors
  primary: "rgb(36, 40, 85)",
  text: "rgb(242, 242, 242)",
  gray: "rgb(136, 136, 142)",
  highlight: "rgb(49, 62, 164)",
  error: "rgb(255, 90, 85)",
  // calculated
  background: "rgb(16, 18, 38)",
  secondary: "",
  codeLine: "",
  codeBlock: "",
  link: "",
  // hidden
  placeholder: "",
  codeText: "",
  dark: "",
  shadow: "",
  linkHover: "",
  highlightHover: "",
  fieldHover: "",
  inactiveColor: "",
  white: "",
};
*/

export default formatThemesList;
