function formatCategory(category) {
  return {
    id: category.sys.id,
    title: category.fields.title,
    path: encodeURIComponent(
      category.fields.title.replace(/\s+/g, "-").toLowerCase()
    ),
  };
}

function formatTopics(topics) {
  return topics.map((topic) => ({
    id: topic.sys.id,
    createdAt: topic.sys.createdAt,
    title: topic.fields.title,
    slug: topic.fields.slug,
    tags: formatTags(topic.metadata.tags),
    category: formatCategory(topic.fields.category),
    solutions: Array.isArray(topic.fields.solutions)
      ? formatSolutions(topic.fields.solutions)
      : [],
  }));
}

function formatTags(tags) {
  var result = [];
  if (tags.length > 0) {
    for (const key of Object.keys(tags)) {
      result.push(tags[key].sys.id);
    }
  }
  return result;
}

function formatSolution(solution) {
  // if (
  //   solution.fields.description &&
  //   solution.fields.title === "Solution Examples"
  // )
  //   console.log(JSON.stringify(solution.fields.description.content, null, 2));
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
    path: encodeURIComponent(
      category.fields.title.replace(/\s+/g, "-").toLowerCase()
    ),
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
