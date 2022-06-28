import React, { useState, useEffect } from "react";
import { Topic } from "../displays/Topic";
import PrimarySearch from "../search/PrimarySearch";
// import { TagField } from "./Tag";
import styled from "@emotion/styled";
// import { theme } from "../../globalStyles";

//! Lots of comments here after I built all the functionality for tags, but decided to remove them. Too much regret to delete the code.
function TopicsView({ currentTopics, tags, spaceID, token }) {
  const [topics, setTopics] = useState([]);
  const [queryResult, setQueryResult] = useState([]);
  // const [activeTagFilters, setActiveTagFilters] = useState([]);

  useEffect(() => {
    const indexableTopics = currentTopics;
    for (let i = 0; i < indexableTopics.length; i++) {
      const indexableSolutions = [];
      if (indexableTopics[i].solutions?.length > 0) {
        indexableTopics[i].solutions.forEach((solution) => {
          indexableSolutions.push(solution.title);
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
  // function thats passed to tag buttons that determines if theyre actively being filtered
  // const handleTags = (tagID) => {
  //   let newTagFilters = activeTagFilters.slice();
  //   var updated = false;
  //   // check if id exists in array, if not add, if so remove.
  //   for (let i = 0; i < newTagFilters.length; i++) {
  //     if (newTagFilters[i] === tagID) {
  //       newTagFilters.splice(i);
  //       setActiveTagFilters(newTagFilters);
  //       updated = true;
  //       break;
  //     }
  //   }
  //   if (!updated) {
  //     newTagFilters.push(tagID);
  //   }
  //   setActiveTagFilters(newTagFilters);
  // };
  // Currently thinking tags are unnecesary
  // const tagsList = [];
  // tags.forEach((tag) => {
  //   tagsList.push(
  //     <TagField key={tag.id} tag={tag} allTags={tags} handleTags={handleTags} />
  //   );
  // });
  const emptySearch = <p>No topics or solutions found</p>;
  let topicsList = [];
  if (queryResult !== null) {
    const filteredTopics = queryResult.length > 0 ? queryResult : topics;
    // const filteredAndTaggedTopics = () => {
    //   if (activeTagFilters.length > 0) {
    //     return filteredTopics.filter((topic) =>
    //       activeTagFilters.every((tagID) => {
    //         for (let i = 0; i < topic.tags.length; i++) {
    //           if (topic.tags[i].id === tagID) {
    //             return true;
    //           }
    //         }
    //         return false;
    //       })
    //     );
    //   } else {
    //     return filteredTopics;
    //   }
    // };

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
    list-style-type: none;
    padding: 0;
    margin: 0;
  `;
  return (
    <div>
      <PrimarySearch topics={topics} setQueryResult={setQueryResult} />
      {/* {tagsList.length > 0 && <ul>{tagsList}</ul>} */}
      {topicsList.length > 0 ? <Ul>{topicsList}</Ul> : <h3>{emptySearch}</h3>}
    </div>
  );
}

export default TopicsView;
