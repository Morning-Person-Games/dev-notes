import { convertToRaw } from "draft-js";
import {
  generateSolutionTitle,
  getContentfulTextTypeFromDraftJs,
} from "./HelperFunctions.js";

function SimpleFormattedTopicEntry(values, getSolutionUniqueID) {
  const newSolutions = [
    {
      id: getSolutionUniqueID(),
      title: generateSolutionTitle(values.solution),
      description: {
        nodeType: "document",
        data: {},
        content: [
          {
            nodeType: "paragraph",
            data: {},
            content: [
              {
                nodeType: "text",
                value: values.solution,
                marks: [],
                data: {},
              },
            ],
          },
        ],
      },
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

// formats draft js form into the contentful data structure
function FormattedTopicEntry(values, getSolutionUniqueID) {
  const contentState = values.editorState.getCurrentContent();
  const solutionValue = convertToRaw(contentState);
  const solutions = [];
  const formattedRichTextContent = [];
  const newImages = [];
  let solutionTitle = "";
  let currentListItems = [];
  let previousType = "";
  // get each draftjs block and add them to a solutionContent list
  solutionValue?.blocks.forEach((block, index, array) => {
    if (block.type === "atomic") {
      // first get image data from draftjs state
      const blockState = contentState.getBlockForKey(block.key);
      const imageKey = blockState.getEntityAt(0);
      const imageInstance = contentState.getEntity(imageKey);
      const data = imageInstance.getData();
      const image = FormattedContentObjectFromImage({
        result: data.result,
      });
      formattedRichTextContent.push(image);
      newImages.push(image);
    } else {
      // Create title from aggregated characters
      if (solutionTitle.length < 500) {
        for (let i = 0; i < block.text.length; i++) {
          if (solutionTitle.length < 500) {
            // add a space in between additional blocks of text
            if (solutionTitle.length > 0 && i === 0) {
              solutionTitle += " ";
            }
            solutionTitle += block.text[i];
          } else {
            break;
          }
        }
      }
      // Lists need different formatting so check for that first
      if (
        block.type === "unordered-list-item" ||
        block.type === "ordered-list-item" ||
        block.type === "blockquote"
      ) {
        // Check if theres an ongoing list and that the current type does not match the prvious or this is the last iteration. Then push() to solutions and reset any ongoing list.
        if (currentListItems.length > 0 && block.type !== previousType) {
          formattedRichTextContent.push(
            FormattedContentObjectFromList(currentListItems, previousType)
          );
          currentListItems = [];
        }

        var listItem = FormattedContentObjectFromTextBlock({
          text: block.text,
          type: "",
          styles: block.inlineStyleRanges,
        });
        currentListItems.push({
          listItem: listItem,
          depth: block.depth,
        });
        if (index === array.length - 1) {
          formattedRichTextContent.push(
            FormattedContentObjectFromList(currentListItems, block.type)
          );
        }
      } else {
        // else = NOT lists
        // check for an on going list as this will be their time to push() and reset.
        if (currentListItems.length > 0) {
          formattedRichTextContent.push(
            FormattedContentObjectFromList(currentListItems, block.type)
          );
          currentListItems = [];
        }
        formattedRichTextContent.push(
          FormattedContentObjectFromTextBlock({
            text: block.text,
            type: block.type,
            styles: block.inlineStyleRanges,
          })
        );
      }
    }
    previousType = block.type;
  });
  const newSolutions = [];
  if (
    !(
      formattedRichTextContent.length === 1 &&
      formattedRichTextContent[0].content.length === 0
    )
  ) {
    newSolutions.push({
      id: getSolutionUniqueID(),
      title: generateSolutionTitle(solutionTitle),
      description: {
        nodeType: "document",
        data: {},
        content: formattedRichTextContent,
      },
    });
  }
  const tags = formatTagsFromValues(values.tags);
  const newTags = formatTagsFromValues(values.tags, true);
  // TODO "additional solutions" go here
  const topicToAdd = {
    title: values.title,
    slug: encodeURIComponent(values.title.replace(/\s+/g, "-").toLowerCase()),
    tags: tags,
    category: values.category,
    solutions: solutions,
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

/*
  This mess formats draftjs lists which are separate objects with depth, into the tiered tree structure of contentful

  textList = [{
    listItem: listItem - (paragraph with text array) FormattedContentObjectFromTextBlock,
    depth: block.depth - int
  }]
  type = block.type - string
*/
function FormattedContentObjectFromList(textList, type) {
  let nodeType = getContentfulTextTypeFromDraftJs(type);
  let list = [];
  if (nodeType === "blockquote") {
    // blockquotes dont have depth so this is a quick push()
    for (let i = 0; i < textList.length; i++) {
      list.push(textList[i].listItem);
    }
  } else {
    // create content tree based on the depths of the list
    let pos = [];
    let currentDepth = 0;
    for (let i = 0; i < textList.length; i++) {
      pos[0] = list.length - 1;
      if (list[pos[0]]?.content[1]) {
        pos[1] = list[pos[0]].content[1].content.length - 1;
        if (list[pos[0]].content[1].content[pos[1]].content[1]) {
          pos[2] =
            list[pos[0]].content[1].content[pos[1]].content[1].content.length -
            1;
          if (
            list[pos[0]].content[1].content[pos[1]].content[1].content[pos[2]]
              .content[1]
          ) {
            pos[3] =
              list[pos[0]].content[1].content[pos[1]].content[1].content[pos[2]]
                .content[1].content.length - 1;
            if (
              list[pos[0]].content[1].content[pos[1]].content[1].content[pos[2]]
                .content[1].content[pos[3]].content[1]
            ) {
              pos[4] =
                list[pos[0]].content[1].content[pos[1]].content[1].content[
                  pos[2]
                ].content[1].content[pos[3]].content[1].content.length - 1;
            }
          }
        }
      }
      // HELP. This is one of the most cursed things I've done, theres gotta be some better way to format this by interating through... I just dont know how
      switch (textList[i].depth) {
        default:
          //after push:
          list[list.length] = {
            nodeType: "list-item",
            data: {},
            content: [textList[i].listItem],
          };
          break;
        case 1:
          if (textList[i].depth > currentDepth) {
            list[pos[0]].content.push({
              nodeType: nodeType,
              data: {},
              content: [],
            });
          }
          list[pos[0]].content[1].content.push({
            nodeType: "list-item",
            data: {},
            content: [textList[i].listItem],
          });
          break;
        case 2:
          if (textList[i].depth > currentDepth) {
            list[pos[0]].content[1].content[pos[1]].content.push({
              nodeType: nodeType,
              data: {},
              content: [],
            });
          }
          list[pos[0]].content[1].content[pos[1]].content[1].content.push({
            nodeType: "list-item",
            data: {},
            content: [textList[i].listItem],
          });
          break;
        case 3:
          if (textList[i].depth > currentDepth) {
            list[pos[0]].content[1].content[pos[1]].content[1].content[
              pos[2]
            ].content.push({
              nodeType: nodeType,
              data: {},
              content: [],
            });
          }
          list[pos[0]].content[1].content[pos[1]].content[1].content[
            pos[2]
          ].content[1].content.push({
            nodeType: "list-item",
            data: {},
            content: [textList[i].listItem],
          });
          break;
        case 4:
          if (textList[i].depth > currentDepth) {
            list[pos[0]].content[1].content[pos[1]].content[1].content[
              pos[2]
            ].content[1].content[pos[3]].content.push({
              nodeType: nodeType,
              data: {},
              content: [],
            });
          }
          list[pos[0]].content[1].content[pos[1]].content[1].content[
            pos[2]
          ].content[1].content[pos[3]].content[1].content.push({
            nodeType: "list-item",
            data: {},
            content: [textList[i].listItem],
          });
          break;
      }
      currentDepth = textList[i].depth;
    }
  }

  return {
    nodeType: nodeType,
    data: {},
    content: list,
  };
}

function FormattedContentObjectFromImage({ result }) {
  return {
    nodeType: "embedded-asset-block",
    data: {
      target: {
        metadata: result.metadata,
        sys: result.sys,
        fields: result.fields,
      },
    },
    content: [],
  };
}

// Formats an individual block of text into a contentful object
function FormattedContentObjectFromTextBlock(block) {
  const textType = getContentfulTextTypeFromDraftJs(block.type);
  return {
    nodeType: textType,
    data: {},
    content: getNodeContentFromStyleRanges(block.text, block.styles),
  };
}

// Draftjs submits style (bold, italics, etc) changes in array of ranges they apply while contentful has each style change as a separate object. This takes the ranges, and formats them into aggregated strings with marks for contentful
function getNodeContentFromStyleRanges(text, inlineStyleRanges) {
  const content = [];
  let characterMarks = [];
  // iterate through each character of the string to create an array of inidividual characters and their marks
  for (let letter = 0; letter < text.length; letter++) {
    let marks = [];
    inlineStyleRanges.forEach((styleRange) => {
      // check each draft js style if they are applicable to the current character
      if (
        letter >= styleRange.offset &&
        letter < styleRange.offset + styleRange.length
      ) {
        var contentfulType = getContentfulTextTypeFromDraftJs(styleRange.style);
        if (marks.length === 0) {
          marks.push({ type: contentfulType });
        } else {
          for (let i = 0; i < marks.length; i++) {
            if (marks[i].type === contentfulType) {
              continue;
            }
            marks.push({ type: contentfulType });
          }
        }
      }
    });
    //create an array of each individual character with the correct contentful format of marks
    characterMarks.push({ value: text[letter], marks: marks });
  }

  // aggregate characters with matching marks arrays.
  let currentIndex = 0;
  for (let i = 0; i < characterMarks.length; i++) {
    if (i === 0) {
      // add the first character
      content[currentIndex] = {
        nodeType: "text",
        value: characterMarks[i].value,
        marks: characterMarks[i].marks,
        data: {},
      };
      continue;
    }
    if (marksEqual(characterMarks[i].marks, content[currentIndex].marks)) {
      // add the singular character to the same index of array
      content[currentIndex].value += characterMarks[i].value;
    } else {
      // create a new index to add a new node/line of text
      currentIndex++;
      content[currentIndex] = {
        nodeType: "text",
        value: characterMarks[i].value,
        marks: characterMarks[i].marks,
        data: {},
      };
    }
  }
  return content;
}

function marksEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i].type !== b[i].type) return false;
  }
  return true;
}

export { FormattedTopicEntry, SimpleFormattedTopicEntry };
