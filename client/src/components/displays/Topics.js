/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import Topic from "./Topic";
import styled from "@emotion/styled";
import SortOptions from "./SortOptions";
import { staticSizes, baseTypes, mixins } from "../../styles/globalStyles";
import {
  BsEyeSlashFill,
  BsEyeFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import PrimarySearch from "../forms/PrimarySearch";
import { TagField } from "./Tag";
import { Link } from "react-scroll";

// styling
const Ul = styled.ul`
  display: flex;
  column-count: 2;
  gap: ${(props) => (!props.topicFocused ? "10px" : 0)};
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: flex-start;
  list-style-type: none;
  padding: 0;
  margin: 0 0 10px 0;
  transition: all 300ms ease-in-out;
`;
const Controls = styled.div`
  display: flex;
  width: 100%;
  flex-flow: row wrap;
  gap: 10px;
  @media screen and (min-width: ${(props) => props.theme.sizes.screenLg}) {
    flex-wrap: ${(props) => (props.tagsvisible ? "wrap" : "nowrap")};
  }
  margin-bottom: ${(props) => (props.topicFocused ? "0px" : "10px")};
  ${mixins.transition("all", 280)};
  opacity: ${(props) => (props.topicFocused ? 0 : 1)};
  height: auto;
  height: ${(props) => props.topicFocused && 0};
`;
const SecondaryControls = styled.div`
  display: flex;
  flex-grow: 2;
  @media screen and (min-width: ${(props) => props.theme.sizes.screenMd}) {
    flex-grow: initial;
  }
`;
const TagsToggle = styled.button`
  position: relative;
  font-size: ${staticSizes.font.lg};
  padding: 10px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  flex-grow: 3;
  @media screen and (min-width: ${(props) => props.theme.sizes.screenMd}) {
    flex-grow: initial;
    order: -1;
  }
  color: ${(props) =>
    props.active ? props.theme.colors.white : props.theme.colors.inactiveColor};
  background-color: ${(props) => props.theme.colors.secondary};
  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
  }
  svg {
    margin-left: 5px;
    margin-top: 2px;
  }
`;
const TagsUl = styled.ul`
  display: flex;
  flex-flow: row wrap;
  row-gap: 10px;
  flex-basis: 100%;
  margin: 0;
  padding: 0;
`;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  transition: all 300ms ease-in-out;
`;

const UpArrow = styled(BsFillArrowUpSquareFill)`
  ${mixins.transition()};
`;

const ScrollToTop = styled.button`
  ${mixins.transition("all", 150)};
  opacity: ${(props) => props.visible};
  cursor: pointer;
  position: fixed;
  bottom: 1em;
  right: 1em;
  display: flex;
  padding: 0;
  font-size: ${staticSizes.font.xl};
  background: none;
  color: ${(props) => props.theme.colors.highlight};
  ${baseTypes.hover} {
    color: ${(props) => props.theme.colors.highlightHover};
  }
`;

function GetTopicsList(
  queryResult,
  activeTagFilters,
  tags,
  spaceID,
  token,
  topicFocused,
  setTopicFocused,
  delay,
  setDelay
) {
  if (queryResult && queryResult.length > 0) {
    const filteredTopics = queryResult.slice();
    if (activeTagFilters.length > 0) {
      const taggedTopics = filteredTopics.filter((topic) =>
        activeTagFilters.some((tagID) => {
          for (let i = 0; i < topic.tags.length; i++) {
            if (topic.tags[i].id === tagID) {
              return true;
            }
          }
          return false;
        })
      );
      return taggedTopics.map((topic) => (
        <Topic
          key={topic.id}
          id={topic.id}
          topic={topic}
          tags={tags}
          spaceID={spaceID}
          token={token}
          topicFocused={topicFocused}
          setTopicFocused={setTopicFocused}
          delay={delay}
          setDelay={setDelay}
        />
      ));
    }
    return queryResult.map((topic) => (
      <Topic
        key={topic.id}
        id={topic.id}
        topic={topic}
        tags={tags}
        spaceID={spaceID}
        token={token}
        topicFocused={topicFocused}
        setTopicFocused={setTopicFocused}
        delay={delay}
        setDelay={setDelay}
      />
    ));
  } else {
    return [];
  }
}

function Topics(props) {
  const { currentTopics, loading, tags, spaceID, token } = props;
  const [sortedTopics, setSortedTopics] = useState(currentTopics);
  const [queryResult, setQueryResult] = useState([]);
  const [topicsList, setTopicsList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [activeTagFilters, setActiveTagFilters] = useState([]);
  const [tagsVisible, setTagsVisible] = useState(false);
  const [sorting, setSorting] = useState(false);
  const [topicFocused, setTopicFocused] = useState(false);
  const [delay, setDelay] = useState(false);
  const [whichSort, setWhichSort] = useState({
    type: "date",
    previous: "date",
    dateReversed: false,
    alphaReversed: false,
  });
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      setSortedTopics(queryResult);
      if (queryResult !== null) {
        setTopicsList(
          GetTopicsList(
            queryResult,
            activeTagFilters,
            tags,
            spaceID,
            token,
            topicFocused,
            setTopicFocused,
            delay,
            setDelay
          )
        );
      }
    }
  }, [
    queryResult,
    tags,
    spaceID,
    token,
    activeTagFilters,
    loading,
    topicFocused,
    delay,
  ]);

  useEffect(() => {
    if (!loading) {
      const newTagsList = [];
      tags.forEach((tag) => {
        newTagsList.push(
          <TagField
            key={tag.id}
            tag={tag}
            allTags={tags}
            handleTags={(tagID, add) => {
              setActiveTagFilters((prev) => {
                if (add) {
                  const newFilters = [tagID].concat(prev);
                  return newFilters;
                } else {
                  // check if id exists in array, if not add, if so remove.
                  let newFilters = [].concat(prev);
                  for (let i = prev.length - 1; i >= 0; i--) {
                    if (prev[i] === tagID) {
                      newFilters.splice(i, 1);
                      return newFilters;
                    }
                  }
                }
              });
            }}
          />
        );
      });
      setTagsList(newTagsList);
    }
  }, [tags, setActiveTagFilters, loading]);

  const NotFound = (
    <div>
      <h2>No topics found!</h2>
      <p>
        Either content is still loading, or the requested page is not available.
      </p>
    </div>
  );
  if (!currentTopics || loading) {
    return NotFound;
  }

  const emptySearch = <p>No topics or solutions found in current category.</p>;
  const TagIcon = !tagsVisible ? <BsEyeSlashFill /> : <BsEyeFill />;
  return (
    <Wrapper id="Notes">
      <Controls topicFocused={topicFocused} tagsvisible={tagsVisible ? 1 : 0}>
        <PrimarySearch topics={currentTopics} setQueryResult={setQueryResult} />
        <TagsToggle
          type="button"
          active={tagsVisible}
          onClick={() => setTagsVisible((prev) => !prev)}
        >
          Tag Filters {TagIcon}
        </TagsToggle>
        <SecondaryControls>
          <SortOptions
            topics={sortedTopics}
            setTopics={setSortedTopics}
            whichSort={whichSort}
            setWhichSort={setWhichSort}
            sorting={sorting}
            setSorting={setSorting}
          />
        </SecondaryControls>
        {tagsVisible && tagsList.length > 0 && <TagsUl>{tagsList}</TagsUl>}
      </Controls>
      {topicsList.length > 0 && queryResult !== null ? (
        <Ul>{topicsList}</Ul>
      ) : (
        <h3>{emptySearch}</h3>
      )}
      <ScrollToTop
        visible={scrollPosition > 500 ? 1 : 0}
        as={Link}
        to="Header"
        smooth={true}
        duration={500}
      >
        <UpArrow />
      </ScrollToTop>
    </Wrapper>
  );
}

export default Topics;
