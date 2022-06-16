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

function getContentfulTextTypeFromDraftJs(typeString) {
  switch (typeString) {
    default:
      return "paragraph";
    case "BOLD":
      return "bold";
    case "ITALIC":
      return "italic";
    case "UNDERLINE":
      return "underline";
    case "CODE":
      return "code";
    case "header-one":
      return "heading-1";
    case "header-two":
      return "heading-2";
    case "header-three":
      return "heading-3";
    case "header-four":
      return "heading-4";
    case "header-five":
      return "heading-5";
    case "header-six":
      return "heading-6";
    case "blockquote":
      return "blockquote";
    case "unordered-list-item":
      return "unordered-list";
    case "ordered-list-item":
      return "ordered-list";
  }
}

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) : str;
}

function generateTempID(title) {
  const text = title.replace(/\s/g, "");
  const max = text.length > 23 ? 23 : text.length;
  let id = "tempID_";
  for (let i = 0; i < max; i++) {
    id += text[i];
  }
  return id;
}

function generateSolutionTitle(title) {
  return truncate(title, 80);
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function replaceCharactersWithWords(str) {
  return str
    .replaceAll("&", "and")
    .replaceAll("#", "sharp")
    .replaceAll("@", "at")
    .replaceAll("%", "percent")
    .replaceAll("+", "plus")
    .replaceAll("-", "minus")
    .replaceAll("*", "asterisk")
    .replaceAll(".", "dot")
    .replace(/[/\\,()$~!'":?<>{}]/g, "");
}

function createTagID(label) {
  var formatted = replaceCharactersWithWords(label);
  return truncate(formatted, 64);
}

function getTagNameFromID(id, tagsList) {
  for (let i = 0; i < tagsList.length; i++) {
    if (tagsList[i].id === id) {
      return tagsList[i].name;
    }
  }
}

export {
  GetCategoryObjectFromID,
  truncate,
  generateTempID,
  generateSolutionTitle,
  getContentfulTextTypeFromDraftJs,
  arraysEqual,
  replaceCharactersWithWords,
  createTagID,
  getTagNameFromID,
};
