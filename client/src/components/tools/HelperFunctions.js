function GetCategoryObjectFromID(topicsList, categoryID, withTopics = false) {
  topicsList.forEach((element) => {
    if (element.id === categoryID) {
      if (!withTopics) {
        return {
          category: element.category,
          id: element.id,
          path: element.path,
        };
      } else {
        return {
          category: element.category,
          id: element.id,
          path: element.path,
          topics: element.topics,
        };
      }
    }
  });
}

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "&hellip;" : str;
}

function generateTempID(title) {
  return "tempID" + truncate(title, 24);
}

function generateSolutionTitle(title) {
  return truncate(title, 80);
}

export {
  GetCategoryObjectFromID,
  truncate,
  generateTempID,
  generateSolutionTitle,
};
