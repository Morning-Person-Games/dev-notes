import React, { useState } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { theme, mixins } from "../../styles/globalStyles";
import { Form, Field, Formik } from "formik";
import slider from "../../styles/slider";
import { SelectField } from "./SelectFields";
import { getFont, getAllFontFaces, getFontOptions } from "../../styles/fonts";
import { components } from "react-select";
import { useSettings } from "../tools/useSettings";

const fontFaces = getAllFontFaces();
const fontOptions = getFontOptions();

//styling
const { sizes, baseTypes, colors } = theme;
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
  margin: 0 0 15px 0;
  .select__control {
    border: 1px solid ${colors.background};
    ${baseTypes.hover} {
      border: 1px solid ${colors.background};
    }
    background-color: ${colors.primary};
    border-radius: ${sizes.radius};
    &:hover {
      background-color: ${colors.reverseFieldHover};
    }
    &:hover:focus-within {
      background-color: ${colors.reverseFieldHover};
    }
    .select__value-container .select__single-value {
      font-family: ${(props) => (props.font ? props.font : "inherit")};
    }
  }
  .select__menu {
    border-radius: ${sizes.radius};
    z-index: 3002;
    padding: 10px 0 6px;
    .select__menu-list .select__option {
      &.current {
        color: ${colors.placeholder};
      }
      span {
        margin-left: 5px;
        font-size: ${sizes.font.xs};
      }
    }
  }
`;
const ThemeSelect = styled(Select)`
  margin: 0;
  .select__control {
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
        border: 1px solid ${colors.background};
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
  const floatValue = (value - 8) / 16;
  const adjust = 30 * floatValue;
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

const background = (palette, isCurrentTheme) => {
  console.log("palette", palette);
  return css`
    color: ${palette.white};
    .select__value-container .select__single-value {
      color: ${isCurrentTheme ? palette.placeholder : palette.white};
    }
    ${mixins.preview(palette)};
    z-index: 1;
  `;
};

const SettingsForm = (props) => {
  const { themesObject, spaceID } = props;
  const { settings, setSettings } = useSettings();
  const [themeBackground, setThemeBackground] = useState(
    background(settings.theme, true)
  );
  const [selectedFont, setSelectedFont] = useState("inherit");
  const themesListUrl = spaceID
    ? "https://app.contentful.com/spaces/" +
      spaceID +
      "/entries?contentTypeId=theme"
    : "https://app.contentful.com/login";
  return (
    <>
      <Global
        styles={css`
          ${fontFaces}
        `}
      />
      <Formik
        initialValues={{
          theme: settings.theme.title,
          font: settings.font,
          textSize: settings.textSize,
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 1000);
        }}
        validate={(values) => {
          const errors = {
            theme: values.theme === settings.theme.title ? "No Changes" : "",
            font: values.font === settings.font ? "No Changes" : "",
            textSize: values.textSize === settings.textSize ? "No Changes" : "",
          };
          return errors;
        }}
        validateOnChange={true}
        validateOnMount={true}
        validateOnBlur={true}
      >
        {({ values, errors, setFieldValue, isSubmitting }) => (
          <FormWrapper>
            <Label>Theme: </Label>
            <ThemeSelect
              name="theme"
              placeholder="Select a new theme..."
              component={SelectField}
              previews={themesObject.previewStyles}
              background={themeBackground}
              // isOptionDisabled={(option) =>
              //   option.value === settings.theme.title
              // }
              getOptionLabel={(option) => {
                if (option.label === settings.theme.title) {
                  option.isCurrent = true;
                }
                return option.label;
              }}
              components={{ Option }}
              isSearchable={false}
              onChange={(e) => {
                if (e?.value) {
                  const aTheme = themesObject.themes.find(
                    (theme) => theme.title === e.value
                  );
                  setThemeBackground(
                    background(
                      aTheme.theme,
                      aTheme.theme.title === settings.theme.title
                    )
                  );
                  setFieldValue("theme", e.value);
                } else {
                  console.log("settings.theme", settings.theme);
                  setThemeBackground(settings.theme, true);
                  setFieldValue("theme", "");
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
              placeholder="Type or select to pick a new font..."
              component={SelectField}
              font={selectedFont}
              options={fontOptions}
              isSearchable={false}
              // isOptionDisabled={(option) => {
              //   return option.isdisabled || option.value === settings.font;
              // }}
              getOptionLabel={(option) => {
                if (option.label === settings.font) {
                  option.isCurrent = true;
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
                  setFieldValue("font", "");
                }
              }}
            />
            <Label>Base Text Size: </Label>
            <Range name="textSize" type="range" min="8" max="24" />
            <RangeValue
              percent={leftPercent(values.textSize)}
              changed={errors.textSize ? 0 : 1}
            >
              <span>{values.textSize + "px"}</span>
            </RangeValue>
            <Submit
              type="submit"
              disabled={
                !isSubmitting ||
                (!errors.theme && !errors.font && !errors.textSize)
                  ? 0
                  : 1
              }
            >
              {errors !== {} ? "Make a Change to Save" : "Save Changes"}
            </Submit>
          </FormWrapper>
        )}
      </Formik>
    </>
  );
};

export default SettingsForm;
