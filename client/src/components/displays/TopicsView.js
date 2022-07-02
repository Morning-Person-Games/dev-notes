/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { Topic } from "../displays/Topic";
import PrimarySearch from "../search/PrimarySearch";
import styled from "@emotion/styled";
import SortOptions from "../tools/SortOptions";
import { css } from "@emotion/react";
import { theme } from "../../globalStyles";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
//import Highlighter from "react-highlight-words";

function TopicsView({ currentTopics, tags, spaceID, token }) {
  const [topics, setTopics] = useState([]);
  const [queryResult, setQueryResult] = useState([]);
  const [tagsVisible, setTagsVisible] = useState(true);
  const [sorting, setSorting] = useState(false);
  const [whichSort, setWhichSort] = useState({
    type: "date",
    previous: "date",
    dateReversed: false,
    alphaReversed: false,
  });

  useEffect(() => {
    const indexableTopics = currentTopics;
    for (let i = 0; i < indexableTopics.length; i++) {
      let indexableSolutions = " ";
      if (indexableTopics[i].solutions?.length > 0) {
        indexableTopics[i].solutions.forEach((solution) => {
          indexableSolutions += " " + solution.description;
        });
      }
      indexableTopics[i].indexableSolutions = indexableSolutions;
    }
    setTopics(indexableTopics);
  }, [currentTopics]);

  const NotFound = (
    <div>
      <h2>No topics found!</h2>
      <p>
        Either content is still loading, or the requested page is not available.
      </p>
    </div>
  );
  if (!topics || topics.length === 0) {
    return NotFound;
  }

  const emptySearch = <p>No topics or solutions found</p>;
  const topicsList = [];
  if (queryResult !== null) {
    const filteredTopics = queryResult.length > 0 ? queryResult : topics;
    // sort here
    filteredTopics.forEach((topic) => {
      topicsList.push(
        <Topic
          key={topic.id}
          topic={topic}
          tags={tags}
          spaceID={spaceID}
          token={token}
        />
      );
    });
  }

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
  const Controls = css`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    @media screen and (min-width: ${sizes.screenLg}) {
      flex-wrap: nowrap;
    }
    margin-bottom: 10px;
  `;
  const SecondaryControls = styled.div`
    display: flex;
  `;
  const TagsToggle = styled.button`
    ${baseTypes.baseControl};
    font-size: ${sizes.font.lg};
    margin-left: 10px;
    padding: 5px 10px;
    padding-right: 2em;
    background-color: ${(props) =>
      props.active ? colors.highlight : colors.secondary};
    color: ${(props) => (props.active ? colors.white : colors.inactiveColor)};
    ${baseTypes.hover} {
      background-color: ${(props) =>
        props.active ? colors.highlightHover : colors.primary};
    }
    svg {
      margin-top: 2px;
      right: 0.7em;
    }
  `;
  const TagIcon = !tagsVisible ? <BsEyeSlashFill /> : <BsEyeFill />;
  return (
    <div>
      <div css={Controls}>
        <PrimarySearch topics={topics} setQueryResult={setQueryResult} />
        <SecondaryControls>
          <SortOptions
            topics={topics}
            setTopics={setTopics}
            whichSort={whichSort}
            setWhichSort={setWhichSort}
            sorting={sorting}
            setSorting={setSorting}
          />
          <TagsToggle
            type="button"
            active={tagsVisible}
            onClick={() => setTagsVisible((prev) => !prev)}
          >
            Tags {TagIcon}
          </TagsToggle>
        </SecondaryControls>
      </div>
      {topicsList.length > 0 ? <Ul>{topicsList}</Ul> : <h3>{emptySearch}</h3>}
    </div>
  );
}

export default TopicsView;
