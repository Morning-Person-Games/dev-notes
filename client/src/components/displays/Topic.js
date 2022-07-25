import React, { useState, useEffect } from "react";
import Solution from "./Solution";
import { TagString } from "./Tag";
import styled from "@emotion/styled";
import { staticSizes, baseTypes, mixins } from "../../styles/globalStyles";
import {
  BsTagsFill,
  BsArrowsAngleExpand,
  BsPencilSquare,
  BsArrowBarDown,
  BsArrowBarUp,
  BsArrowsAngleContract,
} from "react-icons/bs";
import { Link } from "react-scroll";
import { useRef } from "react";

// #region styling
const Card = styled.li`
  display: flex;
  flex-flow: column wrap;
  background-color: ${(props) =>
    props.fullscreen
      ? props.theme.colors.primary
      : props.theme.colors.secondary};
  border-radius: ${staticSizes.radius};
  padding: 0;
  margin-bottom: 0;
  box-shadow: 0 3px 3px 0 ${(props) => props.theme.colors.shadow};
  flex-grow: 1;
  max-width: 100%;
  @media screen and (min-width: ${(props) => props.theme.sizes.screenMd}) {
    max-width: ${(props) => !props.fullscreen && "calc(50% - 5px)"};
  }
  min-width: ${(props) => props.theme.sizes.smCol};
  @media screen and (min-width: ${(props) => props.theme.sizes.screenLg}) {
    width: ${(props) => !props.fullscreen && props.theme.sizes.mdCol};
  }

  // Fullscreen toggle:

  transition: all 300ms ease-in-out;
  width: 100%;
  opacity: 1;
  opacity: ${(props) =>
    ((props.topicFocused && !props.fullscreen) ||
      (!props.fullscreen && !props.topicFocused && props.delay)) &&
    0};
  height: auto;
  height: ${(props) => props.topicFocused && !props.fullscreen && 0};
  z-index: ${(props) => props.topicFocused && props.fullscreen && 2};
  margin-bottom: ${(props) => props.fullscreen && "20px"};
`;
const SolutionsList = styled.ul`
  margin: 0;
  padding: 0;
  flex-grow: 1;
  background-color: ${(props) =>
    props.fullscreen
      ? props.theme.colors.primary
      : props.theme.colors.secondary};
  list-style-type: none;
  ${mixins.transition("padding", 300)};
`;
const Actions = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  flex-wrap: none;
  height: ${staticSizes.minHeight};
  border-radius: 0 0 ${staticSizes.radius} ${staticSizes.radius};
  ${mixins.transition("opacity", 300)};
  opacity: ${(props) => (props.fullscreen ? 0 : 1)};
  display: ${(props) =>
    !props.fullscreen || (props.fullscreen && !props.delay) ? "flex" : "none"};
`;
const AlternateBtn = styled.button`
  color: ${(props) => props.theme.colors.highlight};
  margin: 0;
  padding: 0;
  border-radius: 0;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: stretch;
  font-size: ${mixins.fixedEm(1.9)};
  position: relative;
  cursor: pointer;
  svg {
    height: 100%;
    position: absolute;
  }
  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.highlightHover};
  }
  &:visited {
    color: ${(props) => props.theme.colors.highlight};
  }
  &:hover:visited {
    color: ${(props) => props.theme.colors.highlightHover};
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
  font-size: ${mixins.fixedEm(1.8)};
  svg {
    stroke-width: 0.6;
  }
`;
const Edit = styled(AlternateBtn)`
  height: ${staticSizes.minHeight};
  text-decoration: none;
  width: ${staticSizes.minHeight};
  border-radius: 0 0 0 ${staticSizes.radius};
  font-size: ${mixins.fixedEm(1.9)};
  position: relative;
  svg {
    margin-left: 2px;
    stroke-width: 0.2;
  }
`;
const EditHelperText = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  color: ${(props) => props.theme.colors.white};
  font-weight: 700;
  font-size: ${staticSizes.font.xs};
  position: absolute;
  bottom: -10px;
`;

const ReadMore = styled(AlternateBtn)`
  height: ${staticSizes.minHeight};
  flex-grow: 1;
  border: solid ${(props) => props.theme.colors.secondary};
  border-width: 0 3px;
  font-size: ${mixins.fixedEm(2.3)};
  padding: 0;
  svg {
    stroke-width: 0.4;
  }
`;
const TopicHeader = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  border-radius: ${staticSizes.radius} ${staticSizes.radius} 0 0;
  ${mixins.transition("all", 300)}
  background-color: ${(props) =>
    props.fullscreen ? "transparent" : props.theme.colors.primary};
  position: relative;
  padding-bottom: ${(props) => props.fullscreen && "10px"};
`;
const TopicTitle = styled.h2`
  overflow-wrap: break-word;
  flex-grow: 1;
  margin: 0;
  padding: 10px 10px 10px 10px;
  ${(props) => props.tagged && "padding-bottom: 0px"};
  ${mixins.transition("font-size", 300)}
  font-size: ${(props) => props.fullscreen && staticSizes.font.xxl};
  position: relative;
`;
const TopicDate = styled.span`
  display: block;
  position: absolute;
  bottom: 0;
  bottom: ${(props) => props.fullscreen && "0.5rem"};
  bottom: ${(props) => props.fullscreen && props.tagged && "2.4rem"};
  right: ${(props) => !props.fullscreen && 0};
  left: ${(props) => props.fullscreen && "12px"};
  padding: 1px 2px 0 1px;
  border-radius: 0 0 0 ${staticSizes.radius};
  color: ${(props) => props.theme.colors.inactiveColor};
  font-size: ${staticSizes.font.xs};
  font-weight: 600;
`;

const TagsDiv = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 2px 10px 10px 10px;
  padding: ${(props) => props.fullscreen && "1.2rem 10px 0 10px"};
  margin: 0;
  display: flex;
  flex-basis: 100%;
  list-style-type: none;
  color: ${(props) => props.theme.colors.placeholder};
  ${mixins.transition("all", 300)}
  font-size: ${(props) =>
    props.fullscreen ? staticSizes.font.lg : staticSizes.font.md};
  svg {
    margin: 7px 6px 0 0;
    font-size: ${staticSizes.font.sm};
  }
`;
const ContractBtn = styled.button`
  margin: 5px 10px 0 0;
  float: right;
  font-size: ${staticSizes.font.sm};
  //display: block;
  ${mixins.transition("opacity", 300)};
  ${mixins.transition("color", 150)};
  opacity: ${(props) => (props.fullscreen ? 1 : 0)};
  background: none;
  cursor: pointer;
  &:hover {
    background: none;
  }
  //font-size: ${staticSizes.font.xl};
  color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.highlight};
  ${baseTypes.hover} {
    background: none;
    color: ${(props) => props.theme.colors.highlightHover};
  }
`;

const Padding = styled.div`
  display: block;
  background-color: ${(props) => props.theme.colors.primary};
  height: 5px;
  border-radius: 0 0 ${staticSizes.radius} ${staticSizes.radius};
`;

// #endregion

function Topic({
  topic,
  tags,
  topicFocused,
  setTopicFocused,
  delay,
  setDelay,
}) {
  // #region vars
  const ref = useRef();
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [offsetTop, setOffsetTop] = useState();
  const [editHelper, setEditHelper] = useState(false);

  useEffect(() => {
    if (fullscreen) {
      const close = (e) => {
        if (e.key === "Escape") {
          setOffsetTop(ref.current.offsetTop);
          setFullscreen(false);
          setTimeout(setDelay(false), 300);
          setTopicFocused(false);
        }
      };
      window.addEventListener("keydown", close);
      return () => window.removeEventListener("keydown", close);
    }
  }, [fullscreen, setTopicFocused, setDelay]);
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
        fullscreen={fullscreen}
      />
    );
  });
  const date = new Date(topic.createdAt);
  const year = date.getFullYear().toString().substring(2);
  const dateString = date.getMonth() + "/" + date.getDay() + "/" + year;
  const fullscreenToggle = (toggle) => {
    setOffsetTop(ref.current.offsetTop);
    setFullscreen(toggle);
    setTimeout(setDelay(toggle), 300);
    setTopicFocused(toggle);
  };
  // #endregion
  return (
    <>
      <Card
        offsetTop={offsetTop}
        fullscreen={fullscreen}
        topicFocused={topicFocused}
        delay={delay}
        ref={ref}
      >
        <TopicHeader fullscreen={fullscreen}>
          <TopicTitle
            fullscreen={fullscreen}
            tagged={topic.tags.length > 0 ? 1 : 0}
          >
            {topic.title}
            {fullscreen && (
              <ContractBtn
                as={Link}
                to="NoteEntry"
                smooth={true}
                duration={500}
                fullscreen={fullscreen ? 1 : 0}
                onClick={() => fullscreenToggle(false)}
              >
                <BsArrowsAngleContract />
              </ContractBtn>
            )}
          </TopicTitle>
          {tags.length > 0 && topic.tags.length > 0 && (
            <TagsDiv fullscreen={fullscreen}>
              <BsTagsFill />
              <TagString tagged={topic.tags} allTags={tags} />
            </TagsDiv>
          )}
          <TopicDate
            tagged={tags.length > 0 && topic.tags.length > 0 ? true : false}
            fullscreen={fullscreen}
          >
            {dateString}
          </TopicDate>
        </TopicHeader>
        {solutions.length > 0 ? (
          <SolutionsList fullscreen={fullscreen}>{solutions}</SolutionsList>
        ) : (
          <SolutionsList fullscreen={fullscreen}>
            <Solution
              key={"no solution"}
              solution={[]}
              expanded={expanded}
              setCanExpand={setCanExpand}
              fullscreen={fullscreen}
            />
          </SolutionsList>
        )}
        <Actions fullscreen={fullscreen} delay={delay}>
          <Edit
            onClick={() => {
              setEditHelper(true);
              setTimeout(() => setEditHelper(true), 4000);
            }}
            disabled={editHelper ? 1 : 0}
          >
            <BsPencilSquare />
            <EditHelperText visible={editHelper ? 1 : 0}>
              If this wasn't a demo, this button would go to this Notes
              Contentful edit page!
            </EditHelperText>
          </Edit>
          <ReadMore
            disabled={canExpand ? 0 : 1}
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? <BsArrowBarUp /> : <BsArrowBarDown />}
          </ReadMore>
          <Expand
            as={Link}
            to="Notes"
            smooth={true}
            duration={500}
            onClick={() => fullscreenToggle(true)}
          >
            <BsArrowsAngleExpand />
          </Expand>
        </Actions>
        {fullscreen && <Padding />}
      </Card>
    </>
  );
}

export default Topic;
