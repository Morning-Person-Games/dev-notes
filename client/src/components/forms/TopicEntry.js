import React from "react";
import { Field, withFormik } from "formik";
import * as Yup from "yup";
import SolutionEntry from "./SolutionEntry";
import { EditorState } from "draft-js";
import { generateTempID } from "../tools/HelperFunctions";
import { TagsField } from "./SelectFields";
import { createNewTopic } from "../tools/contentfulManagement";
import { FormattedTopicEntry } from "../tools/EntryFormatters";

const TopicForm = (props) => {
  //const [formActive, setFormActive] = useState(false);
  const {
    values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
    handleSubmit,
    handleReset,
    tags,
    isSubmitting,
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
  };

  // get tag options and create a select list for react-select
  const tagOptions = [];
  if (tags?.length > 0) {
    tags.forEach((tag) => {
      tagOptions.push({ value: tag.id, label: tag.name });
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      {errors.category && touched.title && (
        <div style={{ color: "red", marginTop: ".5rem" }}>
          {errors.category}
        </div>
      )}
      <label htmlFor="tags">Create a new topic:</label>
      <div>
        <Field
          type="text"
          name="title"
          placeholder="Write a descriptive title here"
          onChange={handleTitleField}
        />
        {errors.title && touched.title && (
          <div style={{ color: "red", marginTop: ".5rem" }}>{errors.title}</div>
        )}
      </div>
      <div>
        {/* <label htmlFor="tags">Tags: </label> */}
        <Field
          name="tags"
          component={TagsField}
          placeholder="Type to select Tags..."
          options={tagOptions}
        />
        {errors.tags && touched.title && (
          <div style={{ color: "red", marginTop: ".5rem" }}>{errors.tags}</div>
        )}
      </div>
      <div>
        <label htmlFor="tags">Add a Solution: </label>
        <SolutionEntry
          editorState={values.editorState}
          onChange={setFieldValue}
          onBlur={handleBlur}
          createModal={props.createModal}
          token={props.token}
        />
      </div>
      <div>
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
        <button type="button" onClick={handleReset}>
          X
        </button>
      </div>
    </form>
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
    editorState: EditorState.createEmpty(),
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
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    setTimeout(() => {
      const contentToAdd = FormattedTopicEntry(
        values,
        props.getSolutionUniqueID
      );
      createNewTopic(props.token, JSON.parse(JSON.stringify(contentToAdd)));
      // add details for immediate usage of new content that contentful will generate later:
      contentToAdd.newTopic.id = generateTempID(contentToAdd.newTopic.title);
      contentToAdd.newTopic.createdAt = new Date().toISOString();
      if (contentToAdd.newSolutions && contentToAdd.newSolutions.length > 0) {
        contentToAdd.newSolutions.forEach((newSolution) => {
          newSolution.sysID = generateTempID(newSolution.title);
          newSolution.createdAt = new Date().toISOString();
          contentToAdd.newTopic.solutions.push(newSolution);
        });
      }
      contentToAdd.newTopic.tags.concat(contentToAdd.newTags);
      contentToAdd.newTags.forEach((newTag) => {
        contentToAdd.newTopic.tags.push(newTag);
      });
      props.addToContentList(contentToAdd);
      resetForm({
        values: {
          title: "",
          tags: "",
          editorState: EditorState.createEmpty(),
        },
      });
      setSubmitting(false);
    }, 1000);
  },
  displayName: "TopicForm",
})(TopicForm);

export default TopicEntry;
