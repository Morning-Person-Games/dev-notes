import React from "react";
import Topic from "../fields/Topic";

class TopicsView extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { topics: [] };
  // }

  render() {
    const topics = this.props.topics.map((topic) => {
      //console.log({ topic.topic.id });
      return <Topic key={topic.id} topic={topic} />;
    });
    return <ul>{topics}</ul>;
  }
}

export default TopicsView;
