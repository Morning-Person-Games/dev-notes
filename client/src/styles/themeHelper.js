import { css } from "@emotion/react";
import { mixins, baseTypes, staticSizes } from "./globalStyles";
import defaultColors from "./defaultColors";
import { math, darken, lighten, transparentize } from "polished";

function formattedThemePreview(palette, count) {
  return css`
    .select__option:nth-of-type(${count}) {
      color: ${palette.white};
      ${mixins.backgroundGradient(palette.primary, palette.secondary)};
      &.select__option--is-disabled {
        // disabled means its the currentTheme
        color: ${palette.placeholder};
        cursor: default;
        ${baseTypes.hover} {
          &::before {
            opacity: 0;
          }
        }
      }
      &.current {
        color: ${palette.placeholder};
      }
      &::before {
        ${mixins.transition("opacity", 250)};
        position: absolute;
        border-radius: ${staticSizes.radius};
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        opacity: 0;
        z-index: -1;
        content: "";
        ${mixins.backgroundGradient(palette.highlight, palette.primary)};
      }
      ${baseTypes.hover} {
        &::before {
          opacity: 1;
        }
      }
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

function getThemeSizes(newTextSize) {
  const sizes = {};
  sizes.baseFontSize = newTextSize; // Default fontsizes:
  sizes.screenSm = math(newTextSize + "* 20px"); // 320px
  sizes.smCol = math(sizes.screenSm + "- 20px"); // 300px
  sizes.mdCol = math(sizes.smCol + "* 1.5"); // 450px
  sizes.lgCol = math(sizes.smCol + "* 2"); // 600px
  sizes.screenMd = math(sizes.smCol + "* 2 + 30px"); // 630px
  sizes.screenLg = math("(" + sizes.mdCol + "* 2) + 50px"); // 950px
  sizes.screenXl = math("(" + sizes.lgCol + "* 2) + 50px"); // 1250px
  sizes.maxWidth = math(sizes.screenLg + " - 40px"); // 910px
  return sizes;
}

function getColorsFromTheme(newTheme) {
  const newColors = newTheme.theme;
  newColors.white = newColors.text;
  newColors.inactiveColor = newColors.gray;
  if (newColors.background === "")
    newColors.background = darken("0.13", newColors.primary);
  if (newColors.secondary === "")
    newColors.secondary = darken("0.07", newColors.primary);
  if (newColors.dark === "")
    newColors.dark = darken("0.02", newColors.background);
  if (newColors.highlightHover === "")
    newColors.highlightHover = lighten("0.1", newColors.highlight);
  if (newColors.placeholder === "")
    newColors.placeholder = lighten(0.15, newColors.gray);
  if (newColors.link === "") newColors.link = lighten(0.2, newColors.highlight);
  if (newColors.linkHover === "")
    newColors.linkHover = darken(0.1, newColors.link);
  if (newColors.codeBlock === "") newColors.codeBlock = newColors.background;
  if (newColors.codeLine === "")
    newColors.codeLine = transparentize(0.3, lighten(0.1, newColors.primary));
  if (newColors.codeText === "") newColors.codeText = newColors.white;
  newColors.shadow = transparentize(0.4, "rgb(16, 18, 30)");
  newColors.fieldHover = darken(0.045, newColors.primary);
  newColors.reverseFieldHover = lighten(0.035, newColors.primary);
  return newColors;
}

export { getColorsFromTheme, getThemeSizes, formatThemesList };
