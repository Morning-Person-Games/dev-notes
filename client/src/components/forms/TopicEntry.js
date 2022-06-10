import React, { useState } from "react";
import { Field, withFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import SolutionEntry from "./SolutionEntry";
import { EditorState, convertToRaw } from "draft-js";

const TopicForm = (props) => {
  const [formActive, setFormActive] = useState(false);
  const {
    values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
    handleSubmit,
    handleReset,
  } = props;

  const openForm = function () {
    if (!formActive) {
      setFormActive(true);
    }
  };
  const closeForm = function () {
    if (formActive) {
      setFormActive(false);
    }
  };

  const categoryOptions = [];
  if (props.categories?.length > 0) {
    props.categories.forEach(function (category) {
      categoryOptions.push(
        <option key={category.id} value={category.id}>
          {category.title}
        </option>
      );
    });
    //setFieldValue("category", categoryOptions[0]);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          onClick={openForm}
          type="text"
          name="title"
          placeholder="+ Add a note"
        />
        {errors.title && touched.title && (
          <div style={{ color: "red", marginTop: ".5rem" }}>{errors.title}</div>
        )}
      </div>
      <div>
        <label htmlFor="category">Category: </label>
        <Field as="select" name="category">
          {categoryOptions}
        </Field>
        {errors.category && touched.title && (
          <div style={{ color: "red", marginTop: ".5rem" }}>{errors.title}</div>
        )}
      </div>
      <SolutionEntry
        editorState={values.editorState}
        onChange={setFieldValue}
        onBlur={handleBlur}
        createModal={props.createModal}
      />
      <div>
        <button type="submit">Submit</button>
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
    category: props.categories[0]?.id,
    editorState: EditorState.createEmpty(),
  }),
  validationSchema: Yup.object().shape({
    title: Yup.string()
      .min(3, "Too Short!")
      .max(256, "Too Long!")
      .required("Topic title required"),
    category: Yup.string()
      .min(4, "Too Short!")
      .max(256, "Too Long!")
      .required("Category title required"),
  }),
  enableReinitialize: true,
  handleSubmit: (values, { setSubmitting }) => {
    const contentState = values.editorState.getCurrentContent();
    const solutionValue = convertToRaw(contentState);
    const solutionBlocks = [];
    solutionValue?.blocks.forEach(function (solution) {
      // const contentState = editorState.getCurrentContent();
      // const blockWithLinkAtBeginning = contentState.getBlockForKey('...');
      // const linkKey = blockWithLinkAtBeginning.getEntityAt(0);
      // const linkInstance = contentState.getEntity(linkKey);
      // const {url} = linkInstance.getData();

      if (solution.type === "atomic") {
        const block = contentState.getBlockForKey(solution.key);
        const imageKey = block.getEntityAt(0);
        const imageInstance = contentState.getEntity(imageKey);
        const data = imageInstance.getData();
        solutionBlocks.push({ image: data });
      } else {
        solutionBlocks.push({ text: solution.text, type: solution.type });
      }
    });
    const formattedValues = {
      title: values.title,
      category: values.category,
      editorState: solutionBlocks,
    };
    setTimeout(() => {
      // you probably want to transform draftjs state to something else, but I'll leave that to you.
      console.log(JSON.stringify(formattedValues, null, 2));
      //toast.info(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: "TopicForm",
})(TopicForm);

export default TopicEntry;
