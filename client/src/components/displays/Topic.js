import React from "react";
import { Solution } from "./Solution";
// import { Tag } from "./Tag";
import styled from "@emotion/styled";
import { theme } from "../../globalStyles";
import { MdFullscreen, MdEditNote } from "react-icons/md";

function Topic(props) {
  const solutions = props.topic.solutions.map((solution) => {
    return <Solution key={solution.sysID} solution={solution} />;
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
  const { primary, background, black, gray, inactive } = theme.colors;
  const { radius } = theme.sizes;
  const { baseBtn } = theme.baseTypes;
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
  const Actions = styled.div`
    display: flex;
    flex-wrap: none;
    height: 30px;
  `;
  const alternateBtn = `
  ${baseBtn}
  color: ${gray};
  background-color: ${background};
  font-size: 1.5em;
  &:hover{
    background-color: ${black};
  }
  &:disabled {
    color: ${inactive};
    background-color: ${gray};
    cursor: default;
  }`;
  const Expand = styled.button`
    ${alternateBtn}
    padding: 0;
    border-radius: 0 0 ${radius} 0;
    width: 30px;
    svg {
      margin-top: 3px;
    }
  `;
  const Edit = styled.a`
    ${alternateBtn}
    text-decoration: none;
    padding: 0;
    flex-grow: 1;
    border-radius: 0 0 0 ${radius};
    cursor: pointer;
    text-align: center;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    svg {
      margin-top: 5px;
    }
  `;
  const EditText = styled.div`
    font-size: 16px;
    padding-top: 5px;
    margin-right: 5px;
    cursor: pointer;
  `;
  return (
    <Card>
      <H3>{props.topic.title}</H3>
      {/* {tags.length > 0 && <ul>{tags}</ul>} */}
      {solutions.length > 0 && (
        <div>
          <Ul>{solutions}</Ul>
          <Actions>
            <Edit href={edit} disabled={canEdit}>
              <EditText>Edit</EditText>
              <MdEditNote />
            </Edit>
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
