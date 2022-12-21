import React, { useState } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { baseTypes, staticSizes, mixins } from "../styles/globalStyles";
import { Form, Field, Formik } from "formik";
import { SelectField } from "../components/forms/SelectFields";
import {
  getFont,
  getFontStyles,
  getAllFontFaces,
  getFontOptions,
} from "../styles/fonts";
import { components } from "react-select";
import { toast } from "react-toastify";
import { getThemeSizes, getColorsFromTheme } from "../styles/themeHelper";

const fontFaces = getAllFontFaces();
const fontOptions = getFontOptions();

//styling
const SettingsFormInit = ({ ...props }) => <Form {...props} />;
const FieldInit = ({ ...props }) => <Field {...props} />;
const SelectInit = ({ ...props }) => <SelectField {...props} />;

const FormWrapper = styled(SettingsFormInit)`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  display: block;
  width: 100%;
  input[type="range"] {
    &::-moz-range-track {
      width: 100%;
      height: 10px;
      cursor: pointer;
      border-radius: 10px;
      border: 0;
      background: ${(props) => props.theme.colors.primary};
      ${mixins.transition()};
      &:hover {
        background-color: ${(props) => props.theme.colors.reverseFieldHover};
      }
    }
    &::-moz-range-thumb {
      height: 28px;
      width: 28px;
      border-radius: 30px;
      border: 0;
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -9.5px;
      background-color: ${(props) => props.theme.colors.highlight};
      ${mixins.transition()};
      &:hover {
        box-shadow: 0px 0px 1px 3px ${(props) => props.theme.colors.background};
        background-color: ${(props) => props.theme.colors.highlightHover};
      }
    }
  }
`;

const Submit = styled(baseTypes.DefaultBtn)`
  width: 100%;
  padding: 10px;
  font-size: ${staticSizes.font.xl};
  margin: 10px 0;
`;
const HelperText = styled(baseTypes.FieldHelperText)`
  margin: 2px 0 10px 0;
`;

const Range = styled(FieldInit)`
  &[type="range"] {
    height: 39px;
    -webkit-appearance: none;
    margin: 0;
    width: 100%;
    padding: 0;
    background-color: transparent;
    display: block;
    &:hover {
      background-color: transparent;
    }
    ${mixins.transition()};
    &:focus {
      outline: none;
    }
    &::-webkit-slider-runnable-track {
      width: 100%;
      height: 10px;
      cursor: pointer;
      border-radius: 10px;
      border: 0;
      background: ${(props) => props.theme.colors.primary};
      ${mixins.transition()};
      &:hover {
        background-color: ${(props) => props.theme.colors.reverseFieldHover};
      }
    }
    &::-webkit-slider-thumb {
      height: 28px;
      width: 28px;
      border-radius: 30px;
      border: 0;
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -9.5px;
      background-color: ${(props) => props.theme.colors.highlight};
      ${mixins.transition()};
      ${baseTypes.hover} {
        box-shadow: 0px 0px 1px 3px ${(props) => props.theme.colors.background};
        background-color: ${(props) => props.theme.colors.highlightHover};
      }
      &:focus::-webkit-slider-runnable-track {
        background: ${(props) => props.theme.colors.primary};
      }
      &::-moz-range-track {
        width: 100%;
        height: 10px;
        cursor: pointer;
        border-radius: 10px;
        border: 0;
        background: ${(props) => props.theme.colors.primary};
        ${mixins.transition()};
        &:hover {
          background-color: ${(props) => props.theme.colors.reverseFieldHover};
        }
      }
      &::-moz-range-thumb {
        height: 28px;
        width: 28px;
        border-radius: 30px;
        border: 0;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -9.5px;
        background-color: ${(props) => props.theme.colors.highlight};
        ${mixins.transition()};
        &:hover {
          box-shadow: 0px 0px 1px 3px
            ${(props) => props.theme.colors.background};
          background-color: ${(props) => props.theme.colors.highlightHover};
        }
      }
    }
  }
`;
const RangeValue = styled.div`
  max-width: ${(props) => props.theme.sizes.mdCol};
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
  margin: 10px 0 15px 0;
  span {
    display: block;
    color: ${(props) =>
      props.changed
        ? props.theme.colors.white
        : props.theme.colors.inactiveColor};
    font-size: ${(props) =>
      props.size ? props.size + "px" : staticSizes.font.md};
    position: absolute;
    text-align: center;
    left: ${(props) => props.percent};
    /* must match the thumb width */
    width: 30px;
  }
`;

const Select = styled(SelectInit)`
  padding: 0;
  margin: 0 0 15px 0;
  .select__control {
    border: 1px solid ${(props) => props.theme.colors.background};
    ${baseTypes.hover} {
      border: 1px solid ${(props) => props.theme.colors.background};
    }
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: ${staticSizes.radius};
    &:hover {
      background-color: ${(props) => props.theme.colors.reverseFieldHover};
    }
    &:hover:focus-within {
      background-color: ${(props) => props.theme.colors.reverseFieldHover};
    }
    .select__value-container .select__single-value {
      font-family: ${(props) => (props.font ? props.font : "inherit")};
    }
  }
  .select__menu {
    border-radius: ${staticSizes.radius};
    z-index: 3002;
    padding: 10px 0 6px;
    .select__menu-list .select__option {
      &.current {
        color: ${(props) => props.theme.colors.placeholder};
      }
      span {
        margin-left: 5px;
        font-size: ${staticSizes.font.xs};
      }
    }
  }
`;
const ThemeSelect = styled(Select)`
  margin: 0;
  .select__control {
    ${staticSizes.font.lg};
    color: ${(props) => props.palette.white};
    .select__value-container .select__single-value {
      color: ${(props) =>
        props.isCurrentTheme ? props.palette.placeholder : props.palette.white};
    }
    color: ${(props) => props.palette.white};
    ${(props) =>
      mixins.backgroundGradient(
        props.palette.primary,
        props.palette.secondary
      )};
    &.select__option--is-disabled {
      // disabled means its the currentTheme
      color: ${(props) => props.palette.placeholder};
      cursor: default;
      ${baseTypes.hover} {
        &::before {
          opacity: 0;
        }
      }
    }
    &.current {
      color: ${(props) => props.palette.placeholder};
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
      ${(props) =>
        mixins.backgroundGradient(
          props.palette.highlight,
          props.palette.primary
        )};
    }
    ${baseTypes.hover} {
      &::before {
        opacity: 1;
      }
    }
    z-index: 1;
    cursor: pointer;
  }
  .select__menu {
    border-radius: ${staticSizes.radius};
    padding: 10px;
    .select__menu-list {
      ${(props) => props.previews && props.previews};
      .select__option {
        position: relative;
        z-index: 1;
        border-radius: ${staticSizes.radius};
        border: 1px solid ${(props) => props.theme.colors.background};
        &:not(:last-of-type) {
          margin-bottom: 10px;
        }
      }
    }
  }
`;

const fontStyles = {
  option: (styles, { data }) => {
    if (data.id === "_HEADING") {
      return { ...styles };
    }
    return {
      ...styles,
      fontFamily: data.id && data.id,
    };
  },
};

// not very variable friendly but ranges suck
const leftPercent = (value) => {
  const floatValue = (value - 12) / 16;
  const adjust = value * 2 * floatValue;
  const percent = floatValue * 100;
  return "calc(" + percent + "% - " + adjust + "px)";
};

const Option = ({ children, ...props }) => {
  if (props.data.id && props.data?.id === "_HEADING") {
    return (
      <components.Option
        className="option-heading select__option--is-disabled"
        {...props}
      >
        {children}
      </components.Option>
    );
  }
  return (
    <components.Option className={props.data.isCurrent && "current"} {...props}>
      {children}
      {props.data.isCurrent && <span>(Current)</span>}
    </components.Option>
  );
};

const SettingsForm = (props) => {
  const {
    themesObject,
    setLoadScreen,
    setModalContent,
    setTheme,
    setLoadingFade,
    currentTheme,
  } = props;
  const [background, setBackground] = useState({
    palette: themesObject.getTheme(currentTheme.colors.title),
    isCurrentTheme: true,
  });
  const [selectedFont, setSelectedFont] = useState("inherit");
  const [settingsChanged, setSettingsChanged] = useState({
    theme: false,
    font: false,
    textSize: false,
    valid: false,
  });

  return (
    <>
      <Global
        styles={css`
          ${fontFaces}
        `}
      />
      <Formik
        initialValues={{
          theme: currentTheme.colors.title,
          font: currentTheme.fontName,
          textSize: currentTheme.sizes.baseFontSize,
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          setLoadScreen(true);
          setLoadingFade(true);
          if (!settingsChanged.valid) {
            return;
          }
          const notifID = toast.loading("Applying new settings...");
          setTimeout(() => {
            const newTheme = {};
            newTheme.colors = getColorsFromTheme(
              themesObject.getTheme(
                settingsChanged.theme ? values.theme : currentTheme.colors.title
              )
            );
            newTheme.font = getFontStyles(values.font);
            newTheme.sizes = getThemeSizes(values.textSize);
            newTheme.fontName = values.font;
            setTheme(newTheme);
          }, 600);
          setModalContent(null);
          setTimeout(() => {
            toast.update(notifID, {
              render: "Settings saved!",
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });
            setLoadingFade(false);
            setSubmitting(false);
          }, 2400);
        }}
      >
        {({ values, setFieldValue, isSubmitting, handleSubmit }) => (
          <FormWrapper onSubmit={handleSubmit}>
            <baseTypes.Label>Theme: </baseTypes.Label>
            <baseTypes.ModalField
              as={ThemeSelect}
              name="theme"
              placeholder="Select a theme..."
              previews={themesObject.previewStyles}
              palette={background.palette}
              isCurrentTheme={background.isCurrentTheme}
              getOptionLabel={(option) => {
                if (option.label === currentTheme.colors.title) {
                  option.isCurrent = true;
                } else {
                  option.isCurrent = false;
                }
                return option.label;
              }}
              components={{ Option }}
              isSearchable={false}
              onChange={(e) => {
                if (e?.value) {
                  const aTheme = themesObject.getTheme(e.value);
                  setBackground({
                    palette: aTheme,
                    isCurrentTheme: aTheme.title === currentTheme.colors.title,
                  });
                  setFieldValue("theme", e.value);
                } else {
                  const settingsTheme = themesObject.getTheme(
                    currentTheme.colors.title
                  );
                  setBackground({
                    palette: settingsTheme,
                    isCurrentTheme: true,
                  });
                  setFieldValue("theme", currentTheme.colors.title);
                }
                const themeChanged =
                  e?.value && e.value !== currentTheme.colors.title;
                setSettingsChanged({
                  theme: themeChanged,
                  font: settingsChanged.font,
                  textSize: settingsChanged.textSize,
                  valid: [
                    themeChanged,
                    settingsChanged.font,
                    settingsChanged.textSize,
                  ].includes(true),
                });
              }}
              options={themesObject.options}
            />
            <HelperText>
              If you set up your own Dev Notes, you can make your own custom
              themes!
            </HelperText>
            <baseTypes.Label>Font: </baseTypes.Label>
            <baseTypes.ModalField
              as={Select}
              name="font"
              placeholder="Type or select to pick a font..."
              font={selectedFont}
              options={fontOptions}
              isSearchable={false}
              getOptionLabel={(option) => {
                if (option.label === currentTheme.fontName) {
                  option.isCurrent = true;
                } else {
                  option.isCurrent = false;
                }
                return option.label;
              }}
              styles={fontStyles}
              components={{ Option }}
              onChange={(e) => {
                if (e?.value) {
                  const selectedFont = getFont(e.value);
                  setSelectedFont(
                    selectedFont ? selectedFont.fontID : "inherit"
                  );
                  setFieldValue("font", e.value);
                } else {
                  setSelectedFont("inherit");
                  setFieldValue("font", currentTheme.fontName);
                }
                const fontChanged =
                  e?.value && e.value !== currentTheme.fontName;
                setSettingsChanged({
                  theme: settingsChanged.theme,
                  font: fontChanged,
                  textSize: settingsChanged.textSize,
                  valid: [
                    settingsChanged.theme,
                    fontChanged,
                    settingsChanged.textSize,
                  ].includes(true),
                });
              }}
            />
            <baseTypes.Label>Base Text Size: </baseTypes.Label>
            <baseTypes.ModalField
              as={Range}
              name="textSize"
              type="range"
              min="12"
              max="28"
              onChange={(e) => {
                setFieldValue("textSize", e.target.value);
                const textSizeChanged =
                  e?.target.value &&
                  e.target.value.toString() !== currentTheme.sizes.baseFontSize;
                setSettingsChanged({
                  theme: settingsChanged.theme,
                  font: settingsChanged.font,
                  textSize: textSizeChanged,
                  valid: [
                    settingsChanged.theme,
                    settingsChanged.font,
                    textSizeChanged,
                  ].includes(true),
                });
              }}
              value={values.textSize}
            />
            <RangeValue
              percent={leftPercent(values.textSize)}
              changed={!settingsChanged.textSize ? 0 : 1}
              size={values.textSize}
            >
              <span>{values.textSize + "px"}</span>
            </RangeValue>
            <Submit
              type="submit"
              disabled={isSubmitting || !settingsChanged.valid ? 1 : 0}
            >
              {settingsChanged.valid ? "Save Changes" : "Make a Change to Save"}
            </Submit>
          </FormWrapper>
        )}
      </Formik>
    </>
  );
};

export default SettingsForm;
