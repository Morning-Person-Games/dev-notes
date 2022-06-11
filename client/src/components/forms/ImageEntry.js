import React from "react";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import Thumbnail from "../displays/Thumbnail";
import { EditorState, AtomicBlockUtils } from "draft-js";

function ImageEntry(props) {
  const FILE_SIZE = 10000000;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];
  const validationSchema = Yup.object().shape({
    title: Yup.string().max(256, "Too Long!").required("Required"),
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
  //const handleSubmit = (values) => {};
  return (
    <div>
      <Formik
        initialValues={{ file: null, title: "", description: "" }}
        onSubmit={(values) => {
          alert(
            JSON.stringify(
              {
                fileName: values.file.name,
                type: values.file.type,
                size: `${values.file.size} bytes`,
              },
              null,
              2
            )
          );
          // e.preventDefault();
          // const {editorState, urlValue, urlType} = this.state
          if (props.changeEditorState !== null && props.editorState !== null) {
            const editorState = props.editorState;
            const contentState = editorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity(
              "image",
              "IMMUTABLE",
              values.file
            );
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = EditorState.set(editorState, {
              currentContent: contentStateWithEntity,
            });
            props.changeEditorState(
              AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
            );
          }
          if (props.createModal !== null) {
            props.createModal(null, null);
          }
        }}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue }) => (
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
            {values.file && <Thumbnail file={values.file} />}
            <button type="submit" className="btn btn-primary">
              Add Image
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ImageEntry;
