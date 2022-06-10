import React from "react";

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      thumb: undefined,
    };
  }

  componentDidMount() {
    let file;
    if (!this.props.file) {
      const { block, contentState } = this.props;
      const data = contentState?.getEntity(block.getEntityAt(0)).getData();
      file = data;
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

  render() {
    let { file } = this.props;
    const { loading, thumb } = this.state;
    const thumbMaxWidth = this.props.thumbMaxWidth || 300;

    if (!file) {
      const { block, contentState } = this.props;
      const data = contentState?.getEntity(block.getEntityAt(0)).getData();
      if (!data) {
        return null;
      }
      file = data;
    }
    if (loading) {
      return <p>loading...</p>;
    }

    return (
      <div>
        <img
          src={thumb}
          alt={file.name}
          className="img-thumbnail mt-2"
          style={{ maxWidth: thumbMaxWidth }}
        />
      </div>
    );
  }
}

export default Thumbnail;
