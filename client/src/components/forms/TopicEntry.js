import React, { useState } from "react";
import { Field, withFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import SolutionEntry from "./SolutionEntry";
import { EditorState, convertToRaw } from "draft-js";
import {
  GetCategoryObjectFromID,
  generateTempID,
  generateSolutionTitle,
} from "../tools/HelperFunctions";

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
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    setTimeout(() => {
      // you probably want to transform draftjs state to something else, but I'll leave that to you.
      console.log(
        JSON.stringify(formatTopicEntry(values, props.content), null, 2)
      );
      toast.info("Submitted!");
      // resetForm({
      //   values: {
      //     title: "",
      //     category: values.category,
      //     editorState: EditorState.createEmpty(),
      //   },
      // });
      setSubmitting(false);
    }, 1000);
  },
  displayName: "TopicForm",
})(TopicForm);

export default TopicEntry;

function formatTopicEntry(values, content) {
  const contentState = values.editorState.getCurrentContent();
  const solutionValue = convertToRaw(contentState);
  const solutions = [];
  solutionValue?.blocks.forEach(function (solution) {
    if (solution.type === "atomic") {
      const block = contentState.getBlockForKey(solution.key);
      const imageKey = block.getEntityAt(0);
      const imageInstance = contentState.getEntity(imageKey);
      const data = imageInstance.getData();
      solutions.push(formatSolutionFromBlock({ image: data, type: "image" }));
    } else {
      solutions.push(
        formatSolutionFromBlock({ text: solution.text, type: solution.type })
      );
    }
  });

  // const solutions = {
  //   sysID: "",
  //   createdAt: "",
  //   id: 0,
  //   title: "",
  //   description: {
  //     nodeType: "document",
  //     data: {},
  //     content: [
  //       {
  //         nodeType: "rich text type here",
  //         data: {},
  //         content: [
  //           {
  //             nodeType: "text",
  //             value: "Text",
  //             marks: [],
  //             data: {},
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // };

  const category = GetCategoryObjectFromID(content, values.category);
  const topicToAdd = {
    id: generateTempID(values.title),
    createdAt: new Date().toISOString(),
    title: values.title,
    slug: encodeURIComponent(values.title.replace(/\s+/g, "-").toLowerCase()),
    tags: "",
    category: category,
    solutions: solutions,
  };

  return topicToAdd;
}

function formatSolutionFromBlock(solution) {
  let formattedContent = [];
  if (solution.type === "image") {
  } else {
    switch (solution.type) {
      default:
        formattedContent = [
          {
            nodeType: "paragraph",
            data: {},
            content: [
              {
                nodeType: "text",
                value: "Text",
                marks: [],
                data: {},
              },
            ],
          },
        ];
        break;
      case "BOLD":
        break;
      case "ITALIC":
        break;
      case "UNDERLINE":
        break;
      case "CODE":
        break;
      case "header-one":
        break;
      case "header-two":
        break;
      case "header-three":
        break;
      case "header-four":
        break;
      case "header-five":
        break;
      case "header-six":
        break;
      case "blockquote":
        break;
      case "unordered-list-item":
        break;
      case "ordered-list-item":
        break;
    }
  }
  // description: {
  //   nodeType: "document",
  //   data: {},
  //   content: [
  //     {
  //       nodeType: "rich text type here",
  //       data: {},
  //       content: [
  //         {
  //           nodeType: "text",
  //           value: "Text",
  //           marks: [],
  //           data: {},
  //         },
  //       ],
  //     },
  //   ],
  // },
  return {
    sysID: generateTempID(solution.title),
    createdAt: new Date().toISOString(),
    id: -1,
    title: generateSolutionTitle(solution.text),
    description: {
      nodeType: "document",
      data: {},
      content: formattedContent,
    },
  };
}
