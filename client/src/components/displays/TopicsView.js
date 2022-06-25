import React, { useState, useEffect } from "react";
import { Topic } from "../displays/Topic";
import { TagField } from "./Tag";
import PrimarySearch from "../search/PrimarySearch";

function TopicsView({ currentTopics, tags }) {
  const [topics, setTopics] = useState([]);
  const [queryResult, setQueryResult] = useState([]);
  const [activeTagFilters, setActiveTagFilters] = useState([]);

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
  console.log("topics", topics);
  if (!topics || topics.length === 0) {
    return NotFound;
  }
  const tagsList = [];
  if (tags.length > 0) {
    const handleTags = (tagID) => {
      let newTagFilters = activeTagFilters;
      // check if id exists in array, if not add, if so remove.
      for (let i = 0; i < activeTagFilters.length; i++) {
        if (activeTagFilters[i].id === tagID) {
          newTagFilters.splice(i, 1);
          setActiveTagFilters(newTagFilters);
          return;
        }
      }
      newTagFilters = activeTagFilters.concat(tagID);
      setActiveTagFilters(newTagFilters);
    };

    tags.forEach((tag) => {
      tagsList.push(
        <TagField
          key={tag.id}
          tag={tag}
          allTags={tags}
          handleTags={handleTags}
        />
      );
    });
  }
  // console.log("queryResult", queryResult);
  const emptySearch = <p>No topics or solutions found</p>;
  let topicsList = [];
  if (queryResult !== null) {
    const filteredTopics = queryResult.length > 0 ? queryResult : topics;
    const filteredAndTaggedTopics = () => {
      if (activeTagFilters.length > 0) {
        return filteredTopics.filter((topic) =>
          activeTagFilters.every((tagID) => {
            for (let i = 0; i < topic.tags.length; i++) {
              if (topic.tags[i].id === tagID) {
                return true;
              }
            }
            return false;
          })
        );
      } else {
        return filteredTopics;
      }
    };

    topicsList = filteredAndTaggedTopics().map((topic) => {
      return <Topic key={topic.id} topic={topic} tags={tags} />;
    });
  }

  return (
    <div>
      <PrimarySearch topics={topics} setQueryResult={setQueryResult} />
      {tagsList.length > 0 && <ul>{tagsList}</ul>}
      {topicsList.length > 0 ? <ul>{topicsList}</ul> : <div>{emptySearch}</div>}
    </div>
  );
}

export default TopicsView;
