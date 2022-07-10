import React from "react";
import styled from "@emotion/styled";
import { theme } from "../../styles/globalStyles";
import { Form, Field, withFormik } from "formik";
import slider from "../../styles/slider";
import { SelectField } from "./SelectFields";

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
  margin-bottom: 5px;
`;

const Select = styled(SelectInit)`
  ${baseTypes.modalField};
  padding: 0;
  .select__control {
    background-color: ${colors.primary};
    border-radius: ${sizes.radius};
  }
  .select__menu {
    border-radius: ${sizes.radius};
    padding: 10px 0 8px 0;
    z-index: 3002;
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
  const { spaceID, errors } = props;
  const themesUrl = spaceID
    ? "https://app.contentful.com/spaces/" +
      spaceID +
      "/entries?contentTypeId=theme"
    : "https://app.contentful.com/login";
  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Label>Theme: </Label>
      <Select
        name="theme"
        placeholder="Type or select a theme..."
        component={SelectField}
        options={[
          { value: "default", label: "Default" },
          { value: "light", label: "Light" },
        ]}
      />
      <HelperText>
        Head to your{" "}
        <a href={themesUrl} target="_blank" rel="noreferrer">
          Contentful Space
        </a>{" "}
        to make a custom theme.
      </HelperText>
      <Label>Font: </Label>
      <Select
        name="font"
        placeholder="Type or select a font..."
        component={SelectField}
        options={[
          { value: "default", label: "Default" },
          { value: "light", label: "Light" },
        ]}
      />
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
