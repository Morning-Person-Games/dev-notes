import React, { useState } from "react";
import { Field, Form, withFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import SolutionEntry from "./SolutionEntry";
import { EditorState } from "draft-js";

function TopicEntry(props) {
  const [formActive, setFormActive] = useState(false);
  // const [editorState, setEditorState] = React.useState(() =>
  //   EditorState.createEmpty()
  // );

  const initialValues = {
    title: "",
    category: "",
  };
  initialValues["category"] =
    props.category?.title === "all"
      ? props.categories[0]?.id
      : props.category?.id;

  const categoryOptions = [];
  if (props.categories?.length > 0) {
    props.categories.forEach(function (category) {
      categoryOptions.push(
        <option key={category.id} value={category.id}>
          {category.title}
        </option>
      );
    });
  }

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

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Too Short!")
      .max(256, "Too Long!")
      .required("Topic title required"),
    category: Yup.string()
      .min(4, "Too Short!")
      .max(256, "Too Long!")
      .required("ategory required"),
  });

  const formikEnhancer = withFormik({
    mapPropsToValues: (props) => ({
      title: "",
      category: "",
      editorState: EditorState.createEmpty(),
    }),
    validationSchema: validationSchema,
    handleSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setTimeout(() => {
        // you probably want to transform draftjs state to something else, but I'll leave that to you.
        toast.info(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 1000);
    },
    displayName: "TopicForm",
  });

  const topicForm = (props) => {
    const { values, touched, errors, handleBlur, setFieldValue, handleSubmit } =
      props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            //onClick={openForm}
            type="text"
            name="title"
            placeholder="+ Add a note"
          />
          {errors.title && touched.title && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {errors.title}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="category">Category: </label>
          <Field as="select" name="category">
            {categoryOptions}
          </Field>
        </div>
        <SolutionEntry
          editorState={values.editorState}
          onChange={setFieldValue}
          onBlur={handleBlur}
          createModal={props.createModal}
        />
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={closeForm}>
            X
          </button>
        </div>
      </form>
    );
  };
  const TopicForm = formikEnhancer(topicForm);
  //TODO Show Hide fields through css when able
  return <TopicForm />;
}

export default TopicEntry;
