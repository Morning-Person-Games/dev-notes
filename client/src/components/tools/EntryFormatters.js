async function SimpleFormattedTopicEntry(values) {
  const strippedDescription = await generateSolutionTitle(values.solution);
  const newSolutions = [
    {
      title: strippedDescription,
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
      console.log("data", data);
      return data.json();
    })
    .then((title) => {
      console.log("title", title);
      return title;
    })
    .catch((err) => {
      console.log(
        "EntryFormatters - generateSolutionTitle error: " +
          JSON.stringify(err, null, 2)
      );
      return "error";
    });
}

export default SimpleFormattedTopicEntry;
