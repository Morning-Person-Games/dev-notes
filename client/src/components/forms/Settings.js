import React, { useState } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { theme, mixins } from "../../styles/globalStyles";
import { Form, Field, withFormik } from "formik";
import slider from "../../styles/slider";
import { SelectField } from "./SelectFields";
import {
  getAllFontFaces,
  getFontOptions,
  getFontFamily,
} from "../../styles/fonts";

const fontFaces = getAllFontFaces();
const fontOptions = getFontOptions();

//styling
const { sizes, baseTypes, colors } = theme;
const SettingsFormInit = ({ ...props }) => <Form {...props} />;
const FieldInit = ({ ...props }) => <Field {...props} />;
const SelectInit = ({ ...props }) => (
  <SelectField isOptionDisabled={(option) => option.isdisabled} {...props} />
);

const FormWrapper = styled(SettingsFormInit)`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  display: block;
  width: 100%;
`;

const Label = styled.label`
  ${baseTypes.label};
  display: block;
`;
const Submit = styled.button`
  ${baseTypes.button};
  width: 100%;
  padding: 10px;
  font-size: ${sizes.font.xl};
  margin: 10px 0;
`;
const HelperText = styled.div`
  ${baseTypes.fieldHelperText};
  margin: 2px 0 10px 0;
`;
const Range = styled(FieldInit)`
  ${baseTypes.modalField};
  ${slider};
  padding: 0;
  background-color: transparent;
  display: block;
  &:hover {
    background-color: transparent;
  }
`;
const RangeValue = styled.div`
  max-width: ${sizes.mdCol};
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
  margin: 10px 0;
  //padding: 0 10px;
  span {
    display: block;
    color: ${(props) => (props.changed ? colors.white : colors.inactiveColor)};
    font-size: ${sizes.font.md};
    position: absolute;
    text-align: center;
    left: ${(props) => props.percent};
    /* must match the thumb width */
    width: 30px;
  }
`;

const Select = styled(SelectInit)`
  ${baseTypes.modalField};
  padding: 0;
  margin: ${(props) => (props.margin ? props.margin : 0)};
  .select__control {
    background-color: ${colors.primary};
    border-radius: ${sizes.radius};
    &:hover {
      background-color: ${colors.reverseFieldHover};
    }
    &:hover:focus-within {
      background-color: ${colors.reverseFieldHover};
    }
    .select__value-container .select__single-value {
      color: ${(props) =>
        props.changed ? colors.inactiveColor : colors.white};
    }
  }
  .select__menu {
    border-radius: ${sizes.radius};
    z-index: 3002;
    padding: 10px 0 6px;
  }
`;
const ThemeSelect = styled(Select)`
  .select__control {
    border: 1px solid ${colors.background};
    ${baseTypes.hover} {
      border: 1px solid ${colors.background};
    }
    ${(props) => props.background && props.background};
    cursor: pointer;
  }
  .select__menu {
    border-radius: ${sizes.radius};
    padding: 10px;
    .select__menu-list {
      ${(props) => props.previews && props.previews};
      .select__option {
        position: relative;
        z-index: 1;
        border-radius: ${sizes.radius};
        &:not(:last-of-type) {
          margin-bottom: 10px;
        }
      }
    }
  }
`;

const fontStyles = {
  option: (styles, { data }) => {
    const family = getFontFamily(data.value);
    return {
      ...styles,
      fontFamily: family,
    };
  },
};

// not very variable friendly but ranges suck
const leftPercent = (value) => {
  const floatValue = (value - 8) / 16;
  const adjust = 30 * floatValue;
  const percent = floatValue * 100;
  return "calc(" + percent + "% - " + adjust + "px)";
};

const SettingsForm = (props) => {
  const [themeBackground, setThemeBackground] = useState("");
  const { themesObject, spaceID, values, errors } = props;
  const themesListUrl = spaceID
    ? "https://app.contentful.com/spaces/" +
      spaceID +
      "/entries?contentTypeId=theme"
    : "https://app.contentful.com/login";
  const textSizeValue = values.textSize + "px";

  //themesObject.find((theme) => theme.title === title);
  const themeOptions = [{ value: "default", label: "Default" }];
  if (themesObject !== {}) {
    themesObject.themes.forEach((theme) =>
      themeOptions.push({ value: theme.title, label: theme.title })
    );
  }
  return (
    <>
      <Global
        styles={css`
          ${fontFaces}
        `}
      />
      <FormWrapper>
        <Label>Theme: </Label>
        <ThemeSelect
          name="theme"
          placeholder="Select a theme..."
          component={SelectField}
          previews={themesObject.previewStyles}
          background={themeBackground}
          changed={errors !== {} && errors.theme ? 0 : 1}
          isSearchable={false}
          onChange={(e) => {
            if (e) {
              const aTheme = themesObject.themes.find(
                (theme) => theme.title === e.value
              );
              const background = css`
                color: ${aTheme.theme.white};

                .select__value-container .select__single-value {
                  color: ${aTheme.theme.white};
                }
                ${mixins.preview(aTheme.theme)};
                z-index: 1;
              `;
              setThemeBackground(background);
            } else {
              setThemeBackground("");
            }
          }}
          options={[
            { value: "Default", label: "Default" },
            { value: "Too Bright", label: "Too Bright" },
          ]}
        />
        <HelperText>
          Head to your{" "}
          <a href={themesListUrl} target="_blank" rel="noreferrer">
            Contentful Space
          </a>{" "}
          to make a custom theme.
        </HelperText>
        <Label>Font: </Label>
        <Select
          name="font"
          placeholder="Type to pick a font..."
          component={SelectField}
          margin="0 0 15px 0"
          changed={errors !== {} && errors.font ? 0 : 1}
          options={fontOptions}
          isOptionDisabled={(option) => option.isdisabled}
          styles={fontStyles}
        />
        <Label>Base Text Size: </Label>
        <Range name="textSize" type="range" min="8" max="24" />
        <RangeValue
          percent={leftPercent(values.textSize)}
          changed={errors !== {} && errors.textSize ? 0 : 1}
        >
          <span>{textSizeValue}</span>
        </RangeValue>
        <Submit type="submit" disabled={errors !== {} ? 1 : 0}>
          {errors !== {} ? "Make a Change to Save" : "Save Changes"}
        </Submit>
      </FormWrapper>
    </>
  );
};

const SettingsEntry = withFormik({
  mapPropsToValues: ({ currentSettings }) => ({
    theme: currentSettings ? currentSettings.theme : "default",
    font: currentSettings ? currentSettings.font : "default",
    textSize: currentSettings ? currentSettings.textSize : 16,
  }),

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },

  validate: (values, { currentSettings }) => {
    const errors = {};
    if (values.theme) {
      errors.theme = "No Changes";
    }
    if (values.font) {
      errors.font = "No Changes";
    }
    if (values.textSize) {
      errors.textSize = "No Changes";
    }
    return errors;
  },
  validateOnChange: true,
  validateOnMount: true,
  validateOnBlur: true,

  displayName: "SettingsForm",
})(SettingsForm);

export default SettingsEntry;
