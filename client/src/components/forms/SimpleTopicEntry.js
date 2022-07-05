/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { withFormik, Field } from "formik";
import * as Yup from "yup";
import { generateTempID } from "../tools/HelperFunctions";
import { createNewTopic } from "../tools/contentfulManagement";
import SimpleFormattedTopicEntry from "../tools/EntryFormatters";
import { theme } from "../../globalStyles";
import styled from "@emotion/styled";
import SolutionMd from "./SolutionMd";
// styling
const { baseInput, baseBtn } = theme.baseTypes;
const { primary, white, secondary, inactiveColor } = theme.colors;
const { radius } = theme.sizes;
const { font } = theme.sizes;
const Errors = styled.div`
  color: ${theme.colors.error};
  margin: 5px 0;
  height: 1.4em;
  font-size: 0.8em;
`;
const Submit = styled.button`
  ${baseBtn}
  padding:12px;
  color: ${white};
  font-size: ${font.lg};
  flex-grow: 1;
  border-radius: 0 0 ${radius} ${radius};
  &:disabled {
    color: ${(props) => (props.error ? theme.colors.error : inactiveColor)};
  }
`;

const Buttons = css`
  display: flex;
  flex-wrap: none;
`;
// issue with styled and formik work around
const TitleCSS = css`
  ${baseInput}
  background: none;
  padding: 7px 10px 5px 10px;
  border-bottom: 2px solid ${primary};
  min-height: 2em;
  font-size: 1em;
  box-shadow: inset -1px 2px 4px ${theme.colors.shadow};
`;
const TopicForm = css`
  padding-bottom: 0;
  margin-bottom: 10px;
`;

const TopicFieldWrapper = css`
  display: flex;
  flex-wrap: wrap;
  background: ${secondary};
  border-radius: ${radius} ${radius} 0 0;
`;

const SimpleTopicForm = (props) => {
  const [hasValue, setHasValue] = useState(false);
  const {
    values,
    touched,
    errors,
    setFieldValue,
    handleSubmit,
    isSubmitting,
    handleBlur,
    resetForm,
    isValid,
    handleChange,
  } = props;

  if (!props.token) {
    return;
  }
  // sometimes current category doesnt get set on refresh, this is a fix for that:
  const handleTitleField = (e) => {
    if (!values.category || !values.category.category) {
      if (props.currentCategory.category) {
        setFieldValue("category", {
          id: props.currentCategory.id,
          category: props.currentCategory.category,
          path: props.currentCategory.path,
        });
      }
    }
    setFieldValue("title", e.target.value);
    // this may not look like it matches the validator but it will
    setHasValue(e.target.value.length > 0);
  };
  const handleEmptyBlur = (e) => {
    if (!e.target.value && !values.solution) {
      resetForm();
    }
  };

  const submitText = errors.title ? errors.title : "Add topic";
  return (
    <form onSubmit={handleSubmit} css={TopicForm}>
      {errors.category && touched.title && <Errors>{errors.category}</Errors>}
      <div css={TopicFieldWrapper}>
        <Field
          type="text"
          name="title"
          placeholder="Write a descriptive title here"
          onChange={handleTitleField}
          css={TitleCSS}
          maxLength="255"
          tabIndex="1"
          onBlur={handleEmptyBlur}
          autoFocus
        />
        <SolutionMd
          type="textarea"
          name="solution"
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.solution}
        />
      </div>
      <div css={Buttons}>
        <Submit
          type="submit"
          error={errors.title ? 1 : 0}
          disabled={!isValid || isSubmitting || !hasValue}
        >
          {submitText}
        </Submit>
      </div>
    </form>
  );
};

const SimpleTopicEntry = withFormik({
  mapPropsToValues: (props) => ({
    title: "",
    category: {
      id: props.currentCategory.id,
      category: props.currentCategory.category,
      path: props.currentCategory.path,
    },
    solution: "",
  }),
  validationSchema: Yup.object().shape({
    title: Yup.string()
      .min(3, "Topic title too short!")
      .max(255, "Topic title too long!")
      .required("Topic title required"),
    category: Yup.object().required(
      "Please create or select a category above to add new topics."
    ),
  }),
  handleSubmit: async (values, { props, resetForm }) => {
    const contentToAdd = await SimpleFormattedTopicEntry(values);
    const contentToSend = JSON.parse(JSON.stringify(contentToAdd));
    const { newSolutions, newTopic } = contentToAdd;
    // add details for immediate usage of new content that contentful will generate later:
    newTopic.id = generateTempID(contentToAdd.newTopic.title);
    newTopic.createdAt = new Date().toISOString();

    //TODO multiple solutions for loop:
    if (newSolutions && newSolutions.length > 0) {
      newSolutions[0].sysID = generateTempID(newSolutions[0].title);
      newSolutions[0].createdAt = new Date().toISOString();
      contentToAdd.newTopic.solutions.push(newSolutions[0]);
      // technically it might be better to get md removed to help out search but thatll happen on any refresh so I'm not too worried about it
      contentToAdd.newTopic.indexableSolutions = newSolutions[0].title;
    }
    props.addToContentList(contentToAdd);

    // Send content to contentful
    const createdTopic = await createNewTopic(props.token, contentToSend);
    console.log("createdTopic", createdTopic);
    resetForm({
      values: {
        title: "",
        solution: "",
      },
    });
  },
  displayName: "SimpleTopicForm",
})(SimpleTopicForm);

export default SimpleTopicEntry;
