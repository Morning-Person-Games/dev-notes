import React, { useState } from "react";
import { withFormik, Field } from "formik";
import * as Yup from "yup";
import { generateTempID } from "../tools/helperFunctions";
import { createNewTopic } from "../tools/topicManagement";
import FormattedTopicEntry from "../tools/entryFormatters";
import { baseTypes, staticSizes } from "../../styles/globalStyles";
import styled from "@emotion/styled";
import SolutionMd from "./SolutionMd";
import { TagsField } from "./SelectFields";

// styling
const Errors = styled.div`
  color: ${(props) => props.colors.error};
  margin: 5px 0;
  height: 1.4em;
  font-size: 0.8em;
`;
const Submit = styled(baseTypes.DefaultBtn)`
  padding: 12px;
  color: ${(props) => props.theme.colors.white};
  font-size: ${staticSizes.font.lg};
  flex-grow: 1;
  border-radius: 0 0 ${staticSizes.radius} ${staticSizes.radius};
  &:disabled {
    color: ${(props) =>
      props.error
        ? (props) => props.theme.colors.error
        : props.theme.colors.inactiveColor};
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: none;
`;

const TitleInit = (props) => <Field {...props} />;
// issue with styled and formik work around
const TitleField = styled(TitleInit)`
  border: 0;
  border-radius: ${staticSizes.radius} ${staticSizes.radius} 0 0;
  background: none;
  padding: 5px 10px 5px 12px;
  border-bottom: 3px solid ${(props) => props.theme.colors.primary};
  min-height: 2em;
  font-size: ${staticSizes.font.lg};
  &:hover {
    background-color: ${(props) => props.theme.colors.fieldHover};
  }
  &:hover:focus-within {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;
const FormWrapper = styled.form`
  padding-bottom: 0;
  margin-bottom: 10px;
`;

const TopicFieldWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: ${(props) => props.theme.colors.secondary};
  border-radius: ${staticSizes.radius} ${staticSizes.radius} 0 0;
`;

const TagErrors = styled.div`
  display: block;
  background-color: ${(props) => props.theme.colors.secondary};
  border-top: 1px solid ${(props) => props.theme.colors.primary};
  color: ${(props) => props.colors.error};
  padding: 5px 5px 5px 12px;
  font-size: ${staticSizes.font.sm};
  width: 100%;
`;

const TopicForm = (props) => {
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
    tags,
  } = props;

  if (!props.token) {
    return;
  }
  const tagOptions = [];
  if (tags?.length > 0) {
    tags.forEach((tag) => {
      tagOptions.push({ value: tag.id, label: tag.name });
    });
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
    <FormWrapper onSubmit={handleSubmit}>
      {errors.category && touched.title && <Errors>{errors.category}</Errors>}
      <TopicFieldWrapper>
        <TitleField
          type="text"
          name="title"
          placeholder="Describe a topic for your note..."
          onChange={handleTitleField}
          maxLength="255"
          tabIndex="1"
          onBlur={handleEmptyBlur}
          autoFocus
        />
        <Field
          name="tags"
          component={TagsField}
          placeholder="Type to select any tags..."
          options={tagOptions}
        />
        {errors.tags && touched.title && <TagErrors>{errors.tags}</TagErrors>}
        <SolutionMd
          type="textarea"
          name="solution"
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.solution}
        />
      </TopicFieldWrapper>
      <ButtonsWrapper>
        <Submit
          type="submit"
          error={errors.title ? 1 : 0}
          disabled={!isValid || isSubmitting || !hasValue}
        >
          {submitText}
        </Submit>
      </ButtonsWrapper>
    </FormWrapper>
  );
};

const TopicEntry = withFormik({
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
    tags: Yup.array().of(
      Yup.object().shape({
        label: Yup.string()
          .max(255, "Tags can be no longer than 255 characters")
          .required(),
        value: Yup.string().required(),
      })
    ),
  }),
  handleSubmit: async (values, { props, resetForm }) => {
    const contentToAdd = await FormattedTopicEntry(values);
    /*
    const contentToAdd = {
      newTags: newTags,
      newSolutions: newSolutions,
      newTopic: topicToAdd,      
    };
    */
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
    const createdTopic = await createNewTopic(
      props.token,
      contentToSend,
      props.spaceID
    );
    console.log("createdTopic", createdTopic);
    resetForm({
      values: {
        title: "",
        solution: "",
        tags: "",
      },
    });
  },
  displayName: "TopicForm",
})(TopicForm);

export default TopicEntry;
