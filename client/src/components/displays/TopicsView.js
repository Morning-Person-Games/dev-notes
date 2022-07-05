/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { Topic } from "../displays/Topic";
import styled from "@emotion/styled";
import SortOptions from "../tools/SortOptions";
import { theme } from "../../globalStyles";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import PrimarySearch from "../search/PrimarySearch";
import { TagField } from "./Tag";
//import Highlighter from "react-highlight-words";

// styling
const { baseTypes, sizes, colors } = theme;
const Ul = styled.ul`
  display: flex;
  column-count: 2;
  gap: 10px;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: flex-start;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;
const Controls = styled.div`
  display: flex;
  width: 100%;
  flex-flow: row wrap;
  gap: 10px;
  @media screen and (min-width: ${sizes.screenLg}) {
    flex-wrap: ${(props) => (props.tagsvisible ? "wrap" : "nowrap")};
  }
  margin-bottom: 10px;
`;
const SecondaryControls = styled.div`
  display: flex;
  flex-grow: 2;
  @media screen and (min-width: ${sizes.screenMd}) {
    flex-grow: initial;
  }
`;
const TagsToggle = styled.button`
  ${baseTypes.clickable};
  position: relative;
  font-size: ${sizes.font.lg};
  padding: 12px;
  padding-right: 2em;
  flex-grow: 3;
  @media screen and (min-width: ${sizes.screenMd}) {
    flex-grow: initial;
    order: -1;
  }
  color: ${(props) => (props.active ? colors.white : colors.inactiveColor)};
  background-color: ${colors.secondary};
  &:hover {
    background-color: ${colors.primary};
  }
  svg {
    margin-top: 2px;
    margin-left: 0.3em;
  }
`;
const TagsUl = styled.ul`
  ${baseTypes.baseTagsList};
  margin: 0;
  padding: 0;
`;

function GetTopicsList(
  queryResult,
  activeTagFilters,
  tags,
  spaceID,
  token,
  loading
) {
  if (queryResult && queryResult.length > 0) {
    const filteredTopics = queryResult.slice();
    if (activeTagFilters.length > 0) {
      const taggedTopics = filteredTopics.filter((topic) =>
        activeTagFilters.every((tagID) => {
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
          topic={topic}
          tags={tags}
          spaceID={spaceID}
          token={token}
          loading={loading}
        />
      ));
    }
    return queryResult.map((topic) => (
      <Topic
        key={topic.id}
        topic={topic}
        tags={tags}
        spaceID={spaceID}
        token={token}
      />
    ));
  } else {
    return [];
  }
}

function TopicsView(props) {
  const { currentTopics, loading, tags, spaceID, token } = props;
  const [sortedTopics, setSortedTopics] = useState(currentTopics);
  const [queryResult, setQueryResult] = useState([]);
  const [topicsList, setTopicsList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [activeTagFilters, setActiveTagFilters] = useState([]);
  const [tagsVisible, setTagsVisible] = useState(false);
  const [sorting, setSorting] = useState(false);
  const [whichSort, setWhichSort] = useState({
    type: "date",
    previous: "date",
    dateReversed: false,
    alphaReversed: false,
  });

  useEffect(() => {
    if (!loading) {
      setSortedTopics(queryResult);
      if (queryResult !== null) {
        setTopicsList(
          GetTopicsList(queryResult, activeTagFilters, tags, spaceID, token)
        );
      }
    }
  }, [queryResult, tags, spaceID, token, activeTagFilters, loading]);

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

  const emptySearch = <p>No topics or solutions found in search</p>;
  const TagIcon = !tagsVisible ? <BsEyeSlashFill /> : <BsEyeFill />;
  return (
    <div>
      <Controls tagsvisible={tagsVisible ? 1 : 0}>
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
      {topicsList.length > 0 ? <Ul>{topicsList}</Ul> : <h3>{emptySearch}</h3>}
    </div>
  );
}

export default TopicsView;
