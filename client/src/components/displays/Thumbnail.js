import React from "react";

// basic image thumbnail used while uploading images.
class Thumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      thumb: undefined,
    };
  }
  // on mount create a FileReader to render the image
  componentDidMount() {
    let file;
    if (!this.props.file) {
      const { block, contentState } = this.props;
      const data = contentState?.getEntity(block.getEntityAt(0)).getData();
      file = data.file;
    } else {
      file = this.props.file;
    }
    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };
      reader.readAsDataURL(file);
    });
  }
  // gets a little messy here adding the correct values depending on if its in the draftjs editor or not:
  render() {
    let { file, description } = this.props;
    const { loading, thumb } = this.state;
    const thumbMaxWidth = this.props.thumbMaxWidth || 300;
    if (!file) {
      const { block, contentState } = this.props;
      const data = contentState?.getEntity(block.getEntityAt(0)).getData();
      file = data.file;
      description = data.description;
    }
    if (loading) {
      return <p>loading...</p>;
    }
    const altText = description ? description : file.name;
    if (this.props.blockProps?.inEditor) {
      return (
        <img
          src={thumb}
          alt={altText}
          className="img-thumbnail mt-2"
          style={{ maxWidth: thumbMaxWidth }}
        />
      );
    } else {
      return (
        <div>
          <img
            src={thumb}
            alt={altText}
            className="img-thumbnail mt-2"
            style={{ maxWidth: thumbMaxWidth }}
          />
        </div>
      );
    }
  }
}

export default Thumbnail;
