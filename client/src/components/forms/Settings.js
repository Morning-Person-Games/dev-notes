import React from "react";
import styled from "@emotion/styled";
import { theme } from "../../styles/globalStyles";
import { Form, Field, withFormik } from "formik";
import { HiChevronDown } from "react-icons/hi";
import slider from "../../styles/slider";
import CreatableSelect from "react-select/creatable";

//styling
const { sizes, baseTypes, colors } = theme;
const SettingsFormInit = ({ ...props }) => <Form {...props} />;
const FieldInit = ({ ...props }) => <Field {...props} />;

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
  margin-bottom: 5px;
`;

const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  max-width: ${sizes.mdCol};
  margin-bottom: 10px;
  position: relative;
  svg {
    pointer-events: none;
    font-size: ${sizes.font.xl};
    color: ${colors.white};
    position: absolute;
    right: 10px;
  }
`;
const Select = styled(FieldInit)`
  ${baseTypes.modalField};
  cursor: pointer;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  &:hover {
    background-color: ${colors.highlight};
  }
`;
const Range = styled(FieldInit)`
  ${baseTypes.modalField};
  ${slider};
  background-color: ${colors.secondary};
  display: block;
`;

const handleSubmit = (e) => {
  console.log("e", e);
};

const SettingsForm = (props) => {
  const { themesList, spaceID, errors, values } = props;
  const themesUrl = spaceID
    ? "https://app.contentful.com/spaces/" +
      spaceID +
      "/entries?contentTypeId=theme"
    : "https://app.contentful.com/login";
  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Label>Theme: </Label>
      <SelectWrapper>
        <Select as="select" name="theme" style={{ marginBottom: 0 }}>
          <option value="default">Default</option>
          <option value="light">Light</option>
        </Select>
        <HiChevronDown />
      </SelectWrapper>
      <HelperText>
        Head to your{" "}
        <a href={themesUrl} target="_blank" rel="noreferrer">
          Contentful Space
        </a>{" "}
        to make a custom theme.
      </HelperText>
      <Label>Font: </Label>
      <SelectWrapper>
        <Select as="select" name="font">
          <option value="default">Default</option>
          <option value="cool">Cool</option>
        </Select>
        <HiChevronDown />
      </SelectWrapper>
      <Label>Text Size: </Label>
      <Range type="range" name="textSize" min="8" max="24" />
      <Submit type="submit" disabled={errors ? 1 : 0}>
        Save Changes
      </Submit>
    </FormWrapper>
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

    if (!values.name) {
      errors.name = "Required";
    }

    return errors;
  },

  displayName: "SettingsForm",
})(SettingsForm);

export default SettingsEntry;
