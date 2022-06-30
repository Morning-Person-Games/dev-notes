import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
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
  const [canExpand, setCanExpand] = useState(false);

  useEffect(() => {
    if (expanded) {
      setInactive(false);
    } else {
      if (canExpand) {
        setInactive(false);
      } else {
        setInactive(true);
      }
    }
  }, [expanded, canExpand]);

  const solutions = props.topic.solutions.map((solution) => {
    return (
      <Solution
        key={solution.sysID}
        solution={solution}
        expanded={expanded}
        canExpand={canExpand}
        setCanExpand={setCanExpand}
        count={props.topic.solutions.length}
      />
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
  const noSolutionMsg = canEdit ? (
    <p>
      This topic currently has no solutions.{" "}
      <a href={edit} target="_blank" rel="noreferrer">
        Add a solution here
      </a>
      !
    </p>
  ) : (
    <p>
      This topic currently has no solutions.{" "}
      <a
        href="https://be.contentful.com/login"
        target="_blank"
        rel="noreferrer"
      >
        Login to contentful
      </a>{" "}
      to add a solution!
    </p>
  );
  //styling
  const { primary, secondary, inactiveColor, highlight, dark } = theme.colors;
  const { sizes } = theme;
  const { baseBtn } = theme.baseTypes;
  const Card = styled.li`
    background-color: ${secondary};
    border-radius: ${sizes.radius};
    padding: 0;
    margin-bottom: 0;
    box-shadow: 0 3px 0 ${dark};
    flex-grow: 1;
    @media screen and (min-width: ${sizes.screenMd}) {
      max-width: calc(50% - 5px);
    }
    @media screen and (min-width: ${sizes.screenLg}) {
      width: ${sizes.mdCol};
    }
  `;
  const TopicTitle = styled.h3`
    margin: 0;
    padding: 10px;
    border-radius: ${sizes.radius} ${sizes.radius} 0 0;
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
    background-color: ${primary};
    display: flex;
    flex-wrap: none;
    height: ${sizes.minHeight};
    border-radius: 0 0 ${sizes.radius} ${sizes.radius};
  `;
  const alternateBtn = css`
    ${baseBtn};
    color: ${highlight};
    border-radius: 0;
    background-color: transparent;
    &:hover {
      background-color: ${secondary};
    }
    &:disabled {
      color: ${inactiveColor};
      background-color: transparent;
      cursor: default;
      svg {
        color: transparent;
      }
    }
  `;
  const Expand = styled.button`
    ${alternateBtn};
    height: ${sizes.minHeight};
    padding: 0 8px 0 0;
    margin-left: 8px;
    font-size: 2em;
    border-radius: 0 0 ${sizes.radius} 0;
    svg {
      margin-top: 6px;
    }
  `;
  const Edit = styled.a`
    ${alternateBtn};
    height: ${sizes.minHeight};
    text-decoration: none;
    font-size: 2em;
    padding: 0 6px 0 13px;
    cursor: pointer;
    text-align: center;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    border-radius: 0 0 0 ${sizes.radius};
    svg {
      margin-top: 6px;
    }
  `;
  const ReadMore = styled.button`
    ${alternateBtn};
    height: ${sizes.minHeight};
    flex-grow: 1;
    border: solid ${secondary};
    border-width: 0 3px;
    font-size: 2.5em;
    padding: 0;
    svg {
      color: ${!canExpand && "transparent"};
      margin-top: 3px;
    }
  `;

  return (
    <Card>
      <TopicTitle>{props.topic.title}</TopicTitle>
      {/* {tags.length > 0 && <ul>{tags}</ul>} */}
      {solutions.length > 0 ? (
        <SolutionsList>{solutions}</SolutionsList>
      ) : (
        <SolutionsList>
          <Solution
            key={"no solution"}
            solution={{ missing: noSolutionMsg }}
            expanded={expanded}
            setCanExpand={setCanExpand}
          />
        </SolutionsList>
      )}
      <Actions>
        <Edit href={edit} target="_blank" rel="noreferrer" disabled={canEdit}>
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
    </Card>
  );
}

function TopicExpanded({ topic }) {}

export { Topic, TopicExpanded };
