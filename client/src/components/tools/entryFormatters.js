async function FormattedTopicEntry(values) {
  const newSolutions = [];
  if (values.solutions && values.solutions.length > 0) {
    for (let i = 0; i < values.solutions.length; i++) {
      let solution = values.solutions[i];
      let strippedDescription = await generateSolutionTitle(solution);
      newSolutions.push({
        title: strippedDescription,
        description: solution,
      });
    }
  }
  // sys: {
  //   type: "Link",
  //   linkType: "Tag",
  //   id: tag.sys.id,
  // }
  const tags = formatTagsFromValues(values.tags);
  const newTags = formatTagsFromValues(values.tags, true);
  const topicToAdd = {
    title: values.title,
    slug: encodeURIComponent(values.title.replace(/\W/g, "-").toLowerCase()),
    tags: tags,
    category: values.category,
    solutions: values.refSolutions,
  };

  const contentToAdd = {
    newTags: newTags,
    newSolutions: newSolutions,
    newTopic: topicToAdd,
  };

  return contentToAdd;
}

function formatTagsFromValues(tags, onlyNew) {
  if (!tags || tags.length <= 0) {
    return [];
  }
  let filtered = [];
  if (onlyNew) {
    filtered = tags.filter((tag) => tag.__isNew__);
    if (filtered.length > 0) {
      return filtered.map((tag) => {
        return {
          id: tag.value,
          name: tag.label,
          visibility: "public",
        };
      });
    }
  } else {
    filtered = tags.filter((tag) => !tag.__isNew__);
    if (filtered.length > 0) {
      return filtered.map((tag) => {
        return {
          id: tag.value,
          name: tag.label,
        };
      });
    }
  }
  return [];
}

async function generateSolutionTitle(solutionMd) {
  return fetch("/api/strip", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      markdown: solutionMd,
    }),
  })
    .then((data) => {
      return data.json();
    })
    .then((title) => {
      return title;
    })
    .catch((err) => {
      console.warn(
        "EntryFormatters - generateSolutionTitle error: " +
          JSON.stringify(err, null, 2)
      );
      return "error";
    });
}

export default FormattedTopicEntry;
