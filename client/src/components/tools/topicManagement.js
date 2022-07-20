import CreationError from "../displays/CreationError";
import { toast } from "react-toastify";
/*
  contentToAdd = {
    newTags,
    newSolutions,
    newTopic,
  }; 
*/
async function createNewTopic(
  token,
  { newTopic, newSolutions, newTags, spaceID }
) {
  const notifID = toast.loading("Uploading topic...");
  const messages = [];
  console.log("newTags", newTags);
  const tagResults =
    newTags.length > 0
      ? await createNewTags(token, newTags, false, spaceID)
      : [];
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
      ? await createNewSolutions(token, newSolutions, false, spaceID)
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
  const solutions = [];
  if (filteredSolutions.length > 0) {
    filteredSolutions.forEach((solution) =>
      solutions.push({
        sys: {
          type: "Link",
          linkType: "Entry",
          id: solution.sys.id,
        },
      })
    );
  }
  if (newTopic.solutions.length > 0) {
    newTopic.solutions.forEach((solution) =>
      solutions.push({
        sys: {
          type: "Link",
          linkType: "Entry",
          id: solution.sysID,
        },
      })
    );
  }
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
          render: (
            <CreationError
              title={"Issue creating new topic. "}
              spaceID={spaceID}
            />
          ),
          type: "error",
          isLoading: false,
          autoClose: false,
        });
      }
      return;
    });
}

// each of these createNew functions send their respective data to contentful to be added. If any of these fail, the user is notified with a useful link on contentful to fix the issue.
async function createNewTags(token, tags, notify, spaceID) {
  let notifID = null;
  if (notify) {
    notifID = toast.loading("Creating tags...");
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
          render: (
            <CreationError
              title={"Issue creating new tags. "}
              spaceID={spaceID}
            />
          ),
          type: "error",
          isLoading: false,
          autoClose: false,
        });
      }
      console.log(
        "TopicEntry - createNewTag error: " + JSON.stringify(err, null, 2)
      );
      return "error";
    });
}

async function createNewSolutions(token, solutions, notify, spaceID) {
  let notifID = null;
  if (notify) {
    notifID = toast.loading("Creating solution...");
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
          render: (
            <CreationError
              title={"Issue creating new solutions. "}
              spaceID={spaceID}
            />
          ),
          type: "error",
          isLoading: false,
          autoClose: false,
        });
      }
      return "error";
    });
}

export { createNewTopic, createNewTags, createNewSolutions };
