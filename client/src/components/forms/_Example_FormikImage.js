import React from "react";
import { render } from "react-dom";
import { Formik } from "formik";
import yup from "yup";

class Thumb extends React.Component {
  state = {
    loading: false,
    thumb: undefined,
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) {
      return;
    }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  render() {
    const { file } = this.props;
    const { loading, thumb } = this.state;

    if (!file) {
      return null;
    }

    if (loading) {
      return <p>loading...</p>;
    }

    return (
      <img
        src={thumb}
        alt={file.name}
        className="img-thumbnail mt-2"
        height={200}
        width={200}
      />
    );
  }
}

class App extends React.Component {
  render() {
    const FILE_SIZE = 160 * 1024;
    const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/png",
    ];
    const validationSchema = yup.object().shape({
      file: yup
        .mixed()
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
      <div className="container">
        <Formik
          initialValues={{ title: "", description: "", file: null }}
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
          }}
          validationSchema={validationSchema}
          render={({ values, handleSubmit, setFieldValue }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label for="file">File upload</label>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={(event) => {
                      setFieldValue("file", event.currentTarget.files[0]);
                    }}
                    className="form-control"
                  />
                  <Thumb file={values.file} />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </form>
            );
          }}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
