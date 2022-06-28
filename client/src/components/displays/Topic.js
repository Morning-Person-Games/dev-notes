import React, { useState } from "react";
import { Solution } from "./Solution";
// import { Tag } from "./Tag";
import styled from "@emotion/styled";
import { theme } from "../../globalStyles";
import {
  MdFullscreen,
  MdEditNote,
  MdExpandMore,
  MdExpandLess,
} from "react-icons/md";

function Topic(props) {
  const [expanded, setExpanded] = useState(false);
  const [inactive, setInactive] = useState(false);

  const solutions = props.topic.solutions.map((solution) => {
    return (
      <Solution key={solution.sysID} solution={solution} expanded={expanded} />
    );
  });
  // const tags = props.topic.tags.map((tag) => {
  //   return <Tag key={tag.id} tag={tag} allTags={props.allTags} />;
  // });
  const edit =
    "https://app.contentful.com/spaces/" +
    props.spaceID +
    "/entries/" +
    props.topic.id;
  const canEdit = props.token && props.spaceID ? true : false;
  //styling
  const { primary, background, secondary, gray } = theme.colors;
  const { radius } = theme.sizes;
  const { baseBtn } = theme.baseTypes;
  const Card = styled.li`
    background-color: ${primary};
    border-radius: ${radius};
    padding: 0;
    margin-bottom: 8px;
    box-shadow: 0 2px 0 ${background};
  `;
  const TopicTitle = styled.h3`
    margin: 0;
    padding: 10px;
    border-radius: ${radius} ${radius} 0 0;
    background-color: ${primary};
    overflow-wrap: break-word;
  `;
  const SolutionsList = styled.ul`
    margin: 0;
    padding: 0;
    background-color: ${secondary};
    list-style-type: none;
  `;
  const Actions = styled.div`
    display: flex;
    flex-wrap: none;
    height: 30px;
    background-color: ${primary};
    border-radius: 0 0 ${radius} ${radius};
  `;
  const alternateBtn = `
  ${baseBtn};
  color: ${gray};
  border-radius: 0;
  background-color: transparent;
  &:hover{
    background-color: ${secondary};
  }
  &:disabled {
    color: ${gray};
    background-color: transparent;
    cursor: default;
  }`;
  const Expand = styled.button`
    ${alternateBtn};
    padding: 0 5px 0 3px;
    font-size: 1.5em;
    width: 30px;
    svg {
      margin-top: 3px;
    }
  `;
  const Edit = styled.a`
    ${alternateBtn};
    text-decoration: none;
    font-size: 1.5em;
    padding: 0 3px 0 6px;
    cursor: pointer;
    text-align: center;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    svg {
      margin-top: 4px;
    }
  `;
  const ReadMore = styled.button`
    ${alternateBtn};
    flex-grow: 1;
    border: solid ${secondary};
    border-width: 0 3px;
    font-size: 2em;
    padding: 0;
  `;
  return (
    <Card>
      <TopicTitle>{props.topic.title}</TopicTitle>
      {/* {tags.length > 0 && <ul>{tags}</ul>} */}
      {solutions.length > 0 && (
        <div>
          <SolutionsList>{solutions}</SolutionsList>
          <Actions>
            <Edit href={edit} target="_blank" disabled={canEdit}>
              <MdEditNote />
            </Edit>
            <ReadMore
              onClick={() => setExpanded((prev) => !prev)}
              disabled={inactive}
            >
              {expanded ? <MdExpandLess /> : <MdExpandMore />}
            </ReadMore>
            <Expand disabled>
              <MdFullscreen />
            </Expand>
          </Actions>
        </div>
      )}
    </Card>
  );
}

function TopicExpanded({ topic }) {}

export { Topic, TopicExpanded };
