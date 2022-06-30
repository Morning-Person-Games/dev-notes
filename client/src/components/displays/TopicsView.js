import React, { useState, useEffect } from "react";
import { Topic } from "../displays/Topic";
import PrimarySearch from "../search/PrimarySearch";
import styled from "@emotion/styled";
import SortOptions from "../tools/SortOptions";

function TopicsView({ currentTopics, tags, spaceID, token }) {
  const [topics, setTopics] = useState([]);
  const [queryResult, setQueryResult] = useState([]);
  const [sortDateReverse, setSortDateReverse] = useState(false);
  const [sortAlphaReverse, setSortAlphaReverse] = useState(null);

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

  useEffect(() => {
    // if (prev === null) {
    //   // standard sort by most recent
    //   setTopicsList((prevTopics) => {
    //     var sort = prevTopics.sort((a, b) => a.createdAt - b.createdAt);
    //     console.log("sort", sort);
    //     return prevTopics.sort((a, b) => a.createdAt - b.createdAt);
    //   });
    //   return false;
    // } else {
    //   // toggle between recent and earliest
    //   setTopicsList((prevTopics) => {
    //     //createdAt
    //     return prevTopics.reverse();
    //   });
    //   return !prev;
    // }
    // if (prev === null) {
    //   // sort a-z topic title
    //   setTopicsList((prevTopics) => {
    //     //createdAt
    //     return prevTopics.sort((a, b) =>
    //       a.title.localeCompare(b.title.toLowerCase())
    //     );
    //   });
    //   return false;
    // } else {
    //   // toggle bettween a-z, z-a
    //   setTopicsList((prevTopics) => {
    //     //createdAt
    //     return prevTopics.reverse();
    //   });
    //   return !prev;
    // }
    console.log("sortDateReverse", sortDateReverse);
    console.log("sortAlphaReverse", sortAlphaReverse);
  }, [sortDateReverse, sortAlphaReverse]);

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
  let topicsList = [];
  if (queryResult !== null) {
    const filteredTopics = queryResult.length > 0 ? queryResult : topics;
    topicsList = filteredTopics.map((topic) => {
      return (
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

  const Controls = styled.div`
    display: block;
    width: 100%;
  `;
  return (
    <div>
      <Controls>
        <PrimarySearch topics={topics} setQueryResult={setQueryResult} />
        <SortOptions
          setSortDateReverse={setSortDateReverse}
          setSortAlphaReverse={setSortAlphaReverse}
          sortDateReverse={sortDateReverse}
          sortAlphaReverse={sortAlphaReverse}
        />
      </Controls>
      {topicsList.length > 0 ? <Ul>{topicsList}</Ul> : <h3>{emptySearch}</h3>}
    </div>
  );
}

export default TopicsView;
