import React from "react";
import { Solution } from "./Solution";
// import { Tag } from "./Tag";
import styled from "@emotion/styled";
import { theme } from "../../globalStyles";

function Topic(props) {
  const solutions = props.topic.solutions.map((solution) => {
    return <Solution key={solution.id} solution={solution} />;
  });
  // const tags = props.topic.tags.map((tag) => {
  //   return <Tag key={tag.id} tag={tag} allTags={props.allTags} />;
  // });

  //styling
  const { primary, background, black } = theme.colors;
  const { radius } = theme.sizes;
  const Card = styled.li`
    background-color: ${primary};
    border-radius: ${radius};
    padding: 0;
    margin-bottom: 8px;
    box-shadow: 0 2px 0 ${black};
  `;
  const H3 = styled.h3`
    margin: 0;
    padding: 10px;
    border-bottom: 2px solid ${background};
    overflow-wrap: break-word;
  `;
  const Ul = styled.ul`
    margin: 0;
    padding: 0;
    list-style-type: none;
  `;
  return (
    <Card>
      <H3>{props.topic.title}</H3>
      {/* {tags.length > 0 && <ul>{tags}</ul>} */}
      {solutions.length > 0 && <Ul>{solutions}</Ul>}
    </Card>
  );
}

function TopicExpanded({ topic }) {}

export { Topic, TopicExpanded };
