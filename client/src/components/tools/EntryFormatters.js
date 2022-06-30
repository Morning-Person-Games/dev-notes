import { generateSolutionTitle } from "./HelperFunctions.js";

function SimpleFormattedTopicEntry(values) {
  const newSolutions = [
    {
      title: generateSolutionTitle(values.solution),
      description: values.solution,
    },
  ];
  const topicToAdd = {
    title: values.title,
    slug: encodeURIComponent(values.title.replace(/\s+/g, "-").toLowerCase()),
    tags: [],
    category: values.category,
    solutions: [],
  };

  const contentToAdd = {
    newTags: [],
    newSolutions: newSolutions,
    newTopic: topicToAdd,
  };

  return contentToAdd;
}

export default SimpleFormattedTopicEntry;
