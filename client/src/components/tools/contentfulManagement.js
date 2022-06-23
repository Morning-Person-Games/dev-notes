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
  console.log(newTopic);
  const tagResults =
    newTags.length > 0 ? await createNewTags(token, newTags, false) : [];
  console.log("tagResults", tagResults);
  const filteredTags = [];
  if (tagResults.length > 0) {
    tagResults.forEach((result) => {
      console.log("result.status", result.status);
      if (result.status === "fulfilled") {
        console.log("result.value", result.value);
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
  console.log("tags", tags);
  console.log("newSolutions", newSolutions);
  const solutionsResults =
    newSolutions.length > 0
      ? await createNewSolutions(token, newSolutions, false)
      : [];
  const filteredSolutions = [];
  console.log("solutionsResults", solutionsResults);
  if (solutionsResults > 0) {
    solutionsResults.forEach((result) => {
      console.log("result.status", result.status);
      if (result.status === "fulfilled") {
        console.log("result.value", result.value);
        filteredSolutions.push(result.value);
      } else {
        messages.push(result);
      }
    });
  }
  console.log("filteredSolutions", filteredSolutions);
  const solutions = filteredSolutions.map((solution) => {
    console.log("solution map", solution);
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
  console.log("solutions", solutions);
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
  console.log("topic", topic);
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
      console.log(data);
      return data.json();
    })
    .then((topic) => {
      console.log(topic);
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

async function createNewImage(token, image, notify) {
  let notifID = null;
  if (notify) {
    notifID = toast.loading("Creating content...", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
  let formData = new FormData();
  formData.append("file", image.file);
  formData.append("token", token);
  formData.append("title", image.title);
  formData.append("description", image.description);
  return fetch("/api/upload/image", {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .then((image) => {
      if (notifID) {
        toast.update(notifID, {
          render: "Image uploaded!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }
      return image;
    })
    .catch((err) => {
      if (notifID) {
        toast.update(notifID, {
          render:
            "Image upload failed. Try again and if the issue persists, try adding it directly in contentful after the solution has been added.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
      console.log(
        "TopicEntry - createNewTag error: " + JSON.stringify(err, null, 2)
      );
      return null;
    });
}

async function createNewSolutions(token, solutions, notify) {
  let notifID = null;
  if (notify) {
    notifID = toast.loading("Creating solution...", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  console.log("createNewSolutions", solutions);
  solutions.forEach((solution) => {
    var content = solution.description.content;
    for (let i = 0; i < content.length; i++) {
      if (content[i].nodeType === "embedded-asset-block") {
        solution.description.content[i].data.target = {
          sys: {
            type: "Link",
            linkType: "Asset",
            id: content[i].data.target.sys.id,
          },
        };
      }
    }
  });
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
      console.log("solutions res:", solutions);
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

export { createNewTopic, createNewImage, createNewTags, createNewSolutions };
