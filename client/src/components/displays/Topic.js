import React, { useState } from "react";
import { Solution } from "./Solution";
import { TagString } from "./Tag";
import styled from "@emotion/styled";
import { staticSizes, baseTypes, mixins } from "../../styles/globalStyles";
import {
  MdFullscreen,
  MdEditNote,
  MdExpandMore,
  MdExpandLess,
} from "react-icons/md";
import { BsTagsFill } from "react-icons/bs";

//styling
const Card = styled.li`
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: ${staticSizes.radius};
  padding: 0;
  margin-bottom: 0;
  box-shadow: 0 3px 3px 0 ${(props) => props.theme.colors.shadow};
  flex-grow: 1;
  max-width: 100%;
  @media screen and (min-width: ${(props) => props.theme.sizes.screenMd}) {
    max-width: calc(50% - 5px);
  }
  @media screen and (min-width: ${(props) => props.theme.sizes.screenLg}) {
    width: ${(props) => props.theme.sizes.mdCol};
  }
`;
const SolutionsList = styled.ul`
  margin: 0;
  padding: 0;
  background-color: ${(props) => props.theme.colors.secondary};
  list-style-type: none;
`;
const Actions = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  flex-wrap: none;
  height: ${staticSizes.minHeight};
  border-radius: 0 0 ${staticSizes.radius} ${staticSizes.radius};
`;
const AlternateBtn = styled.button`
  color: ${(props) => props.theme.colors.highlightHover};
  margin: 0;
  padding: 0;
  border-radius: 0;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: stretch;
  font-size: ${mixins.fixedEm(staticSizes.font.h1n)};
  position: relative;
  svg {
    height: 100%;
    position: absolute;
  }
  &:hover {
    color: ${(props) => props.theme.colors.highlight};
    background-color: ${(props) => props.theme.colors.secondary};
  }
  &:disabled {
    color: ${(props) => props.theme.colors.inactiveColor};
    background-color: transparent;
    cursor: default;
    svg {
      color: transparent;
    }
  }
`;
const Expand = styled(AlternateBtn)`
  height: ${staticSizes.minHeight};
  width: ${staticSizes.minHeight};
  border-radius: 0 0 ${staticSizes.radius} 0;
  svg {
    margin-right: 1px;
  }
`;
const Edit = styled(AlternateBtn)`
  height: ${staticSizes.minHeight};
  text-decoration: none;
  width: ${staticSizes.minHeight};
  cursor: pointer;
  border-radius: 0 0 0 ${staticSizes.radius};
  svg {
    margin-left: 2px;
  }
`;

const ReadMore = styled(AlternateBtn)`
  height: ${staticSizes.minHeight};
  flex-grow: 1;
  border: solid ${(props) => props.theme.colors.secondary};
  border-width: 0 3px;
  font-size: ${mixins.fixedEm(2.5)};
  padding: 0;
`;
const TopicHeader = styled.div`
  display: block;
  border-radius: ${staticSizes.radius} ${staticSizes.radius} 0 0;
  background-color: ${(props) => props.theme.colors.primary};
  position: relative;
`;
const TopicTitle = styled.h2`
  overflow-wrap: break-word;
  margin: 0;
  padding: 10px 10px 10px 10px;
  ${(props) => props.tagged && "padding-bottom: 0px"};
`;
const TopicDate = styled.span`
  display: block;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 1px 2px 0 1px;
  border-radius: 0 0 0 ${staticSizes.radius};
  color: ${(props) => props.theme.colors.placeholder};
  background-color: ${(props) => props.theme.colors.primary};
  font-size: ${staticSizes.font.xs};
  font-weight: 600;
`;

const TagsDiv = styled.div`
  ${(props) => baseTypes.tagsList(props.theme)};
  background-color: ${(props) => props.theme.colors.primary};
  padding: 2px 10px 10px 10px;
  gap: 5px;
  margin: 0;
  list-style-type: none;
  color: ${(props) => props.theme.colors.placeholder};
  svg {
    margin-top: 4px;
    font-size: ${staticSizes.font.sm};
  }
`;

function TagsList({ tagged, allTags }) {
  if (!tagged || !tagged.length === 0) {
    return;
  }
  return (
    <TagsDiv>
      <BsTagsFill />
      <TagString tagged={tagged} allTags={allTags} />
    </TagsDiv>
  );
}

function Topic({ topic, tags, spaceID, token }) {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const edit =
    "https://app.contentful.com/spaces/" + spaceID + "/entries/" + topic.id;
  const canEdit = token && spaceID ? true : false;
  //TODO optimize - this could be rendered less?
  const solutions = topic.solutions.map((solution) => {
    return (
      <Solution
        key={solution.sysID}
        solution={solution}
        expanded={expanded}
        canExpand={canExpand}
        edit={edit}
        setCanExpand={setCanExpand}
        solutionCount={topic.solutions.length - 1}
      />
    );
  });
  const date = new Date(topic.createdAt);
  const year = date.getFullYear().toString().substring(2);
  const dateString = date.getMonth() + "/" + date.getDay() + "/" + year;
  return (
    <Card>
      <TopicHeader>
        <TopicTitle tagged={topic.tags.length > 0 ? 1 : 0}>
          {topic.title}
        </TopicTitle>
        {tags.length > 0 && topic.tags.length > 0 && (
          <TagsList tagged={topic.tags} allTags={tags} expanded={expanded} />
        )}
        <TopicDate>{dateString}</TopicDate>
      </TopicHeader>
      {solutions.length > 0 ? (
        <SolutionsList>{solutions}</SolutionsList>
      ) : (
        <SolutionsList>
          <Solution
            key={"no solution"}
            solution={[]}
            expanded={expanded}
            edit={edit}
            setCanExpand={setCanExpand}
          />
        </SolutionsList>
      )}
      <Actions>
        <Edit
          as="a"
          href={edit}
          target="_blank"
          rel="noreferrer"
          disabled={canEdit}
        >
          <MdEditNote />
        </Edit>
        <ReadMore
          disabled={canExpand ? 0 : 1}
          onClick={() => setExpanded((prev) => !prev)}
        >
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
