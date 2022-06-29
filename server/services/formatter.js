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
  if (tags.length <= 0) {
    return [];
  }
  return tags.map((tag) => ({
    id: tag.id ? tag.id : tag.sys.id,
    name: tag.name ? tag.name : "",
  }));
}

function formatSolution(solution) {
  return {
    sysID: solution.sys.id,
    createdAt: solution.sys.createdAt,
    title: solution.fields.title,
    description: solution.fields.description,
    tempDes: solution.fields.tempDes ? solution.fields.tempDes : "",
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

module.exports = {
  formatCategory,
  formatSolutions,
  formatTopics,
  formatMainTopicsList,
  formatTags,
};
