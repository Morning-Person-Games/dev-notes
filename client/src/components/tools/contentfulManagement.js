import { toast } from "react-toastify";
/*
  contentToAdd = {
    newTags,
    newSolutions,
    newTopic,
  }; 
*/
async function createNewTopic(token, { newTopic, newSolutions, newTags }) {
  const notifID = toast.loading("Creating topic...", {
    position: toast.POSITION.TOP_RIGHT,
  });
  const messages = [];
  const tagResults =
    newTags.length > 0 ? await createNewTags(token, newTags, false) : [];
  console.log("tagResults", tagResults);
  const filteredTags = [];
  if (tagResults.length > 0) {
    tagResults.forEach((result) => {
      if (result.status === "fulfilled") {
        filteredTags.push(result.value);
      } else {
        messages.push(result);
      }
    });
  }
  const tags = filteredTags.map((tag) => {
    return {
      sys: {
        type: "Link",
        linkType: "Tag",
        id: tag.sys.id,
      },
    };
  });
  newTopic.tags.forEach((tag) => {
    tags.push({
      sys: {
        type: "Link",
        linkType: "Tag",
        id: tag.id,
      },
    });
  });

  const solutionsResults =
    newSolutions.length > 0
      ? await createNewSolutions(token, newSolutions, false)
      : [];
  const filteredSolutions = [];
  if (solutionsResults.length > 0) {
    solutionsResults.forEach((result) => {
      if (result.status === "fulfilled") {
        filteredSolutions.push(result.value);
      } else {
        messages.push(result);
      }
    });
  }
  const solutions = filteredSolutions.map((solution) => {
    return {
      sys: {
        type: "Link",
        linkType: "Entry",
        id: solution.sys.id,
      },
    };
  });
  newTopic.solutions.forEach((solution) => {
    solutions.push({
      sys: {
        type: "Link",
        linkType: "Entry",
        id: solution.sys.id,
      },
    });
  });
  console.log("all tags:", tags);
  console.log("all solutions:", solutions);
  const topic = {
    tags: tags,
    title: newTopic.title,
    slug: newTopic.slug,
    category: {
      sys: {
        type: "Link",
        linkType: "Entry",
        id: newTopic.category.id,
      },
    },
    solutions: solutions,
  };
  return fetch("/api/create/topic", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      topic: topic,
    }),
  })
    .then((data) => {
      return data.json();
    })
    .then((topic) => {
      console.log("Created topic: ", topic);
      if (messages.length > 0) {
        messages.forEach((message) => {
          console.log(message);
          //toast.info(message.error);
        });
      }
      if (notifID) {
        toast.update(notifID, {
          render: "Topic succesfully created!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }
      return topic;
    })
    .catch((err) => {
      console.log(
        "TopicEntry - createNewTag error: " + JSON.stringify(err, null, 2)
      );
      if (notifID) {
        toast.update(notifID, {
          render:
            "Issue creating new topic. If trying again does not work, try adding directly in contentful",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
      return;
    });
}

// each of these createNew functions send their respective data to contentful to be added. If any of these fail, the user is notified with a useful link on contentful to fix the issue.
async function createNewTags(token, tags, notify) {
  let notifID = null;
  if (notify) {
    notifID = toast.loading("Creating tags...", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  return fetch("/api/create/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      tags: tags,
    }),
  })
    .then((data) => {
      return data.json();
    })
    .then((tags) => {
      if (notifID) {
        toast.update(notifID, {
          render: "Tags created!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }
      return tags;
    })
    .catch((err) => {
      if (notifID) {
        toast.update(notifID, {
          render:
            "Issue creating tags. If trying again does not work, try adding directly in contentful",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
      console.log(
        "TopicEntry - createNewTag error: " + JSON.stringify(err, null, 2)
      );
      return "error";
    });
}

async function createNewSolutions(token, solutions, notify) {
  let notifID = null;
  if (notify) {
    notifID = toast.loading("Creating solution...", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  return fetch("/api/create/solutions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      solutions: solutions,
    }),
  })
    .then((data) => {
      return data.json();
    })
    .then((solutions) => {
      if (notifID) {
        toast.update(notifID, {
          render: "solutions created!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }
      return solutions;
    })
    .catch((err) => {
      console.log(
        "TopicEntry - createNewSolution error: " + JSON.stringify(err, null, 2)
      );
      if (notifID) {
        toast.update(notifID, {
          render:
            "Issue creating solution. Try again and if the issue persists, try adding it directly in contentful after the solution has been added.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
      return "error";
    });
}

export { createNewTopic, createNewTags, createNewSolutions };
