function formatCategory(category) {
  return {
    id: category.sys.id,
    title: category.fields.title,
  };
}

function formatTopics(topics) {
  return topics.map((topic) => ({
    id: topic.sys.id,
    createdAt: topic.sys.createdAt,
    title: topic.fields.title,
    slug: topic.fields.slug,
    tags: topic.metadata.tags,
    category: formatCategory(topic.fields.category),
    solutions: formatSolutions(topic.fields.solutions),
  }));
}

function formatSolution(solution) {
  return {
    sysID: solution.sys.id,
    createdAt: solution.sys.createdAt,
    id: solution.fields.id,
    title: solution.fields.title,
    description: solution.fields.description,
  };
}

function formatSolutions(solutions) {
  return solutions.map(formatSolution);
}

function formatMainTopicsList(categories, topics) {
  return categories.map((category) => ({
    id: category.sys.id,
    category: category.fields.title,
    topics: formatTopicsFromCategory(topics, category),
  }));
}

function formatTopicsFromCategory(topics, category) {
  var filtered = topics.filter(
    (topic) => topic.fields.category.sys.id === category.sys.id
  );
  return formatTopics(filtered);
}

// function formatSlugFromTitle(title) {
//   return encodeURIComponent(
//     title
//       .toLowerCase()
//       .replace(/[^a-z0-9 _-]+/gi, "-")
//       .slice(40)
//   );
// }
//^[a-z0-9_-]*$

module.exports = {
  formatCategory,
  formatSolutions,
  formatTopics,
  formatMainTopicsList,
};
