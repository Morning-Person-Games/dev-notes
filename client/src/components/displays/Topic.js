import React, { useState } from "react";
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

//styling
const { primary, secondary, inactiveColor, highlight, dark, highlightHover } =
  theme.colors;
const { sizes, baseTypes, colors } = theme;
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
  ${baseTypes.clickable};
  color: ${highlightHover};
  margin: 0;
  padding: 0;
  border-radius: 0;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: stretch;
  font-size: ${sizes.font.fixedEm(sizes.font.h1n)};
  svg {
    height: 100%;
  }
  &:hover {
    color: ${highlight};
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
  width: ${sizes.minHeight};
  border-radius: 0 0 ${sizes.radius} 0;
  svg {
    margin-right: 1px;
  }
`;
const Edit = styled.a`
  ${alternateBtn};
  height: ${sizes.minHeight};
  text-decoration: none;
  width: ${sizes.minHeight};
  cursor: pointer;
  border-radius: 0 0 0 ${sizes.radius};
  svg {
    margin-left: 2px;
  }
`;

const ReadMore = styled.button`
  ${alternateBtn};
  height: ${sizes.minHeight};
  flex-grow: 1;
  border: solid ${secondary};
  border-width: 0 3px;
  font-size: ${sizes.font.fixedEm(2.5)};
  padding: 0;
`;
const TopicHeader = styled.div`
  display: block;
  border-radius: ${sizes.radius} ${sizes.radius} 0 0;
  background-color: ${primary};
  position: relative;
`;
const TopicTitle = styled.h2`
  overflow-wrap: break-word;
  margin: 0;
  padding: 10px;
  padding-top: 8px;
`;
const TopicDate = styled.span`
  display: block;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 1px 2px 0 1px;
  border-radius: 0 0 0 ${sizes.radius};
  color: ${colors.placeholder};
  background-color: ${colors.primary};
  font-size: ${sizes.font.xs};
  font-weight: 600;
`;

function Topic({ topic, tags, spaceID, token }) {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);

  //TODO optimize - this could be rendered less?
  const solutions = topic.solutions.map((solution) => {
    return (
      <Solution
        key={solution.sysID}
        solution={solution}
        expanded={expanded}
        canExpand={canExpand}
        setCanExpand={setCanExpand}
        solutionCount={topic.solutions.length - 1}
      />
    );
  });
  // const tags = props.topic.tags.map((tag) => {
  //   return <Tag key={tag.id} tag={tag} allTags={props.allTags} />;
  // });
  const edit =
    "https://app.contentful.com/spaces/" + spaceID + "/entries/" + topic.id;
  const canEdit = token && spaceID ? true : false;
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
  const date = new Date(topic.createdAt);
  const year = date.getFullYear().toString().substring(2);
  const dateString = date.getMonth() + "/" + date.getDay() + "/" + year;
  return (
    <Card>
      <TopicHeader>
        <TopicTitle>{topic.title}</TopicTitle>
        <TopicDate>{dateString}</TopicDate>
      </TopicHeader>
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
        <ReadMore onClick={() => setExpanded((prev) => !prev)}>
          {expanded ? <MdExpandLess /> : <MdExpandMore />}
        </ReadMore>
        <Expand>
          <MdFullscreen />
        </Expand>
      </Actions>
    </Card>
  );
}

function TopicExpanded({ topic }) {}

export { Topic, TopicExpanded };
