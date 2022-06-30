/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { withFormik, Field } from "formik";
import * as Yup from "yup";
import { generateTempID } from "../tools/HelperFunctions";
import { createNewTopic } from "../tools/contentfulManagement";
import { SimpleFormattedTopicEntry } from "../tools/EntryFormatters";
import { theme } from "../../globalStyles";
import styled from "@emotion/styled";
import SolutionMd from "./SolutionMd";

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
    setHasValue(values.title.length > 1);
  };
  // styling
  const { baseInput, baseBtn } = theme.baseTypes;
  const { primary, white, secondary } = theme.colors;
  const { radius } = theme.sizes;
  const Errors = styled.div`
    color: ${theme.colors.error};
    margin: 5px 0;
    height: 1.4em;
    font-size: 0.8em;
  `;
  const Submit = css`
    ${baseBtn}
    padding:10px;
    color: ${white};
    font-size: 1.1em;
    flex-grow: 1;
    border-radius: 0 0 ${radius} ${radius};
  `;
  const Buttons = css`
    display: flex;
    flex-wrap: none;
  `;
  // issue with styled and formik work around
  const TitleCSS = css`
    ${baseInput}
    background: none;
    padding: 5px 10px;
    border-bottom: 2px solid ${primary};
    min-height: 2em;
    font-size: 1em;
  `;
  const TopicForm = css`
    padding-bottom: 0;
  `;

  const TopicFieldWrapper = css`
    display: flex;
    flex-wrap: wrap;
    background: ${secondary};
    border-radius: ${radius} ${radius} 0 0;
  `;

  const handleEmptyBlur = (e) => {
    if (!e.target.value && !values.solution) {
      resetForm();
    }
  };

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
        <button
          css={Submit}
          type="submit"
          disabled={!isValid || isSubmitting || !hasValue}
        >
          Add topic
        </button>
      </div>
      <Errors>{errors.title}</Errors>
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
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    setTimeout(() => {
      const contentToAdd = SimpleFormattedTopicEntry(values);
      const { newSolutions, newTopic } = contentToAdd;
      const createdTopic = createNewTopic(
        props.token,
        JSON.parse(JSON.stringify(contentToAdd))
      );
      // TODO disable submission until promise complete
      console.log("createdTopic", createdTopic);
      // add details for immediate usage of new content that contentful will generate later:
      newTopic.id = generateTempID(contentToAdd.newTopic.title);
      newTopic.createdAt = new Date().toISOString();
      if (newSolutions && newSolutions.length > 0) {
        newSolutions[0].sysID = generateTempID(newSolutions[0].title);
        newSolutions[0].createdAt = new Date().toISOString();
        contentToAdd.newTopic.solutions.push(newSolutions[0]);
      }
      props.addToContentList(contentToAdd);
      resetForm({
        values: {
          title: "",
          solution: "",
        },
      });
      setSubmitting(false);
    }, 1000);
  },
  displayName: "SimpleTopicForm",
})(SimpleTopicForm);

export default SimpleTopicEntry;
