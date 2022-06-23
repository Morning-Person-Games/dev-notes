import React from "react";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import Thumbnail from "../displays/Thumbnail";
import { EditorState, AtomicBlockUtils } from "draft-js";
import { createNewImage } from "../tools/contentfulManagement";

// This creates a modal popup with standard image fields.
// To understand additional details checkout Formik forms and Yup
function ImageEntry(props) {
  if (!props.token) {
    return null;
  }
  const FILE_SIZE = 10000000;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];
  const validationSchema = Yup.object().shape({
    title: Yup.string().max(256, "Too Long!").required("Image title required."),
    description: Yup.string().max(5000, "Too Long!"),
    file: Yup.mixed()
      .required()
      .test(
        "fileSize",
        "File too large",
        (value) => value && value.size <= FILE_SIZE
      )
      .test(
        "fileFormat",
        "Unsupported Format",
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
  });

  return (
    <div>
      <Formik
        initialValues={{ file: null, title: "", description: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          if (props.token !== null) {
            const result = await createNewImage(
              props.token,
              {
                title: values.title,
                description: values.description,
                file: values.file,
              },
              true
            );
            // create a block in the editor to preview the image.
            if (
              result &&
              props.changeEditorState !== null &&
              props.editorState !== null
            ) {
              const editorState = props.editorState;
              const contentState = editorState.getCurrentContent();
              const contentStateWithEntity = contentState.createEntity(
                "image",
                "IMMUTABLE",
                {
                  title: values.title,
                  description: values.description,
                  file: values.file,
                  result: result,
                }
              );
              const entityKey =
                contentStateWithEntity.getLastCreatedEntityKey();
              const newEditorState = EditorState.set(editorState, {
                currentContent: contentStateWithEntity,
              });
              props.changeEditorState(
                AtomicBlockUtils.insertAtomicBlock(
                  newEditorState,
                  entityKey,
                  " "
                )
              );
            }
            setSubmitting(false);
            // close the modal on completion
            if (props.createModal !== null) {
              props.createModal(null, null);
            }
          }
        }}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="title">Title</label>
              <Field type="text" name="title" />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <Field type="textarea" name="description" />
            </div>
            <label htmlFor="file">File upload</label>
            <input
              id="file"
              name="file"
              type="file"
              onChange={(event) => {
                setFieldValue("file", event.currentTarget.files[0]);
              }}
              className="form-control"
            />
            {values.file && (
              <Thumbnail file={values.file} description={values.description} />
            )}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              Upload Image
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ImageEntry;
