import React, { useState, useEffect } from "react";
import Solution from "./Solution";
import { TagString } from "./Tag";
import styled from "@emotion/styled";
import { staticSizes, mixins } from "../../styles/globalStyles";
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
import { ReactComponent as Logo } from "../../logo.svg";

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
  padding-bottom: ${(props) => props.fullscreen && "10px"};
  flex-grow: 1;
  background-color: ${(props) =>
    props.fullscreen
      ? props.theme.colors.primary
      : props.theme.colors.secondary};
  list-style-type: none;
  ${mixins.transition("padding", 300)};
`;
const Actions = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.primary};
  border-top: ${(props) =>
    props.fullscreen && "3px solid " + props.theme.colors.secondary};
  flex-wrap: none;
  border-radius: 0 0 ${staticSizes.radius} ${staticSizes.radius};
`;
const AlternateBtn = styled.button`
  color: ${(props) => props.theme.colors.highlight};
  margin: 0;
  padding: 5px;
  border-radius: 0;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  svg {
    height: 100%;
    font-size: 2em;
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
  border-radius: 0 0 ${staticSizes.radius} 0;
  svg {
    stroke-width: 0.6;
  }
`;
const Edit = styled(AlternateBtn)`
  text-decoration: none;
  border-radius: 0 0 0 ${staticSizes.radius};
  //font-size: ${mixins.fixedEm(1.9)};
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

// commented out until I decide to add in app editing
// const AddSolutionBtn = styled(AlternateBtn)`
//   flex-grow: 1;
//   border: solid ${(props) => props.theme.colors.secondary};
//   border-width: 0 3px;
//   padding: 0;
//   font-size: ${staticSizes.font.xl};
//   svg {
//     font-size: ${staticSizes.font.md};
//     position: inherit;
//     stroke-width: 0.4;
//   }
// `;
const ReadMore = styled(AlternateBtn)`
  flex-grow: 1;
  border: solid ${(props) => props.theme.colors.secondary};
  border-width: 0 3px;
  padding: 2px 0;
  svg {
    stroke-width: 0.4;
    font-size: 3.2em;
  }
`;
const TopicHeader = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border-radius: ${staticSizes.radius} ${staticSizes.radius} 0 0;
  ${mixins.transition("all", 300)}
  background-color: ${(props) =>
    props.fullscreen ? "transparent" : props.theme.colors.primary};
  position: relative;
  padding: ${(props) => props.fullscreen && "10px 20px"};
`;
const TopicTitle = styled.h2`
  overflow-wrap: break-word;
  flex-grow: 1;
  margin: 0;
  padding: ${(props) =>
    props.fullscreen ? "0 10px 0 15px" : "10px 10px 10px 12px"};
  ${(props) => props.tagged && "padding-bottom: 0px"};
  ${mixins.transition("all", 300)};
  font-size: ${(props) => props.fullscreen && staticSizes.font.xxl};
  position: relative;
`;
const TopicDate = styled.span`
  display: block;
  position: absolute;
  ${mixins.transition("all", 300)}
  bottom: ${(props) => !props.fullscreen && 0};
  top: ${(props) => props.fullscreen && "5px"};
  right: ${(props) => (props.fullscreen ? "7px" : 0)};
  padding: 1px 2px 0 1px;
  border-radius: 0 0 0 ${staticSizes.radius};
  color: ${(props) => props.theme.colors.inactiveColor};
  font-size: ${(props) =>
    props.fullscreen ? staticSizes.font.sm : staticSizes.font.xs};
  font-weight: 600;
`;

const TagsDiv = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  padding: ${(props) =>
    props.fullscreen ? "15px 10px 0 0" : "2px 10px 10px 12px"};
  margin: 0;
  display: flex;
  align-items: center;
  flex-basis: 100%;
  list-style-type: none;
  ${mixins.transition("all", 300)}
  font-size: ${staticSizes.font.md};
  svg {
    color: ${(props) =>
      props.fullscreen
        ? props.theme.colors.white
        : props.theme.colors.placeholder};
    margin: ${(props) => (props.fullscreen ? "3px 12px 0 0" : "3px 6px 0 0")};
    font-size: ${(props) =>
      props.fullscreen ? staticSizes.font.lg : staticSizes.font.sm};
  }
`;
const TitleIcon = styled(Logo)`
  display: ${(props) => (props.fullscreen ? "block" : "none")};
  font-size: ${staticSizes.font.lg};
  margin-top: 3px;
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
  const dateString = date.toLocaleString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "2-digit",
  });
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
          <TitleIcon fullscreen={fullscreen ? 1 : 0} />
          <TopicTitle
            fullscreen={fullscreen}
            tagged={topic.tags.length > 0 ? 1 : 0}
          >
            {topic.title}
          </TopicTitle>
          {tags.length > 0 && topic.tags.length > 0 && (
            <TagsDiv fullscreen={fullscreen}>
              <BsTagsFill />
              <TagString
                tagged={topic.tags}
                allTags={tags}
                fullscreen={fullscreen}
              />
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
        <Actions delay={delay} fullscreen={fullscreen}>
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
            disabled={fullscreen || !canExpand ? 1 : 0}
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? <BsArrowBarUp /> : <BsArrowBarDown />}
          </ReadMore>
          <Expand
            as={Link}
            to="Notes"
            smooth={true}
            duration={500}
            onClick={() => fullscreenToggle(!fullscreen)}
          >
            {fullscreen ? <BsArrowsAngleContract /> : <BsArrowsAngleExpand />}
          </Expand>
        </Actions>
      </Card>
    </>
  );
}

export default Topic;
