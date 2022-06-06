import React from "react";

class TopicView extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { topics: [] };
  // }

  // componentDidMount() {
  //   fetch("/api/topics")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((topics) => {
  //       console.log(topics);
  //       this.setState({ topics });
  //     });
  // }

  render() {
    console.log(this.props.topics);
    return <h2>Topic View Here</h2>;
  }
}

export default TopicView;
