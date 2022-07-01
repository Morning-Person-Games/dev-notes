/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { Topic } from "../displays/Topic";
import PrimarySearch from "../search/PrimarySearch";
import styled from "@emotion/styled";
import SortOptions from "../tools/SortOptions";
import { css } from "@emotion/react";

function TopicsView({ currentTopics, tags, spaceID, token }) {
  const [topics, setTopics] = useState([]);
  const [queryResult, setQueryResult] = useState([]);

  useEffect(() => {
    const indexableTopics = currentTopics;
    for (let i = 0; i < indexableTopics.length; i++) {
      const indexableSolutions = [];
      if (indexableTopics[i].solutions?.length > 0) {
        indexableTopics[i].solutions.forEach((solution) => {
          indexableSolutions.push(solution.description);
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
    display: block;
    width: 100%;
  `;
  return (
    <div>
      <div css={Controls}>
        <PrimarySearch topics={topics} setQueryResult={setQueryResult} />
        <SortOptions setTopics={setTopics} />
      </div>
      {topicsList.length > 0 ? <Ul>{topicsList}</Ul> : <h3>{emptySearch}</h3>}
    </div>
  );
}

export default TopicsView;
