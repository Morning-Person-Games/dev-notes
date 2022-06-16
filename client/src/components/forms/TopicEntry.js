import React from "react";
import { Field, withFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import SolutionEntry from "./SolutionEntry";
import { EditorState, convertToRaw } from "draft-js";
import {
  GetCategoryObjectFromID,
  generateTempID,
  generateSolutionTitle,
  getContentfulTextTypeFromDraftJs,
} from "../tools/HelperFunctions";
import TagsField from "./TagsField";

const TopicForm = (props) => {
  //const [formActive, setFormActive] = useState(false);
  const {
    values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
    handleSubmit,
    handleReset,
  } = props;

  // keeping these around in case I decide it feels better to have the form show/hide
  // const openForm = function () {
  //   if (!formActive) {
  //     setFormActive(true);
  //   }
  // };

  // const closeForm = function () {
  //   if (formActive) {
  //     setFormActive(false);
  //   }
  // };

  // get category options and create a select list
  const categoryOptions = [];
  if (props.categories?.length > 0) {
    props.categories.forEach(function (category) {
      categoryOptions.push(
        <option key={category.id} value={category.id}>
          {category.title}
        </option>
      );
    });
  }

  const tagOptions = [];
  if (props.tags?.length > 0) {
    props.tags.forEach((tag) => {
      tagOptions.push({ value: tag.id, label: tag.name });
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field type="text" name="title" placeholder="+ Add a note" />
        {errors.title && touched.title && (
          <div style={{ color: "red", marginTop: ".5rem" }}>{errors.title}</div>
        )}
      </div>
      <div>
        <label htmlFor="category">Category: </label>
        <Field as="select" name="category">
          {categoryOptions}
        </Field>
        {errors.category && touched.title && (
          <div style={{ color: "red", marginTop: ".5rem" }}>{errors.title}</div>
        )}
      </div>
      <div>
        <Field
          name="tags"
          component={TagsField}
          placeholder="Select tags..."
          options={tagOptions}
        />
      </div>
      <SolutionEntry
        editorState={values.editorState}
        onChange={setFieldValue}
        onBlur={handleBlur}
        createModal={props.createModal}
      />
      <div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>
          X
        </button>
      </div>
    </form>
  );
};

const TopicEntry = withFormik({
  mapPropsToValues: (props) => ({
    title: "",
    category: props.categories[0]?.id,
    editorState: EditorState.createEmpty(),
  }),
  validationSchema: Yup.object().shape({
    title: Yup.string()
      .min(3, "Too Short!")
      .max(255, "Too Long!")
      .required("Topic title required"),
    category: Yup.string()
      .min(4, "Too Short!")
      .max(255, "Too Long!")
      .required("Category title required"),
    tags: Yup.array().of(
      Yup.object().shape({
        label: Yup.string().max(255, "Too Long!").required(),
        value: Yup.string().required(),
      })
    ),
  }),
  enableReinitialize: true,
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    setTimeout(() => {
      // you probably want to transform draftjs state to something else, but I'll leave that to you.
      //console.log(formatTopicEntry(values, props.content));
      //__isNew__ for new tags
      console.log(
        JSON.stringify(FormattedTopicEntry(values, props.content), null, 2)
      );
      toast.info("Submitted!");
      resetForm({
        values: {
          title: "",
          category: values.category,
          editorState: EditorState.createEmpty(),
        },
      });
      setSubmitting(false);
    }, 1000);
  },
  displayName: "TopicForm",
})(TopicForm);

export default TopicEntry;

// formats draft js form into the contentful data structure
function FormattedTopicEntry(values, content) {
  const contentState = values.editorState.getCurrentContent();
  const solutionValue = convertToRaw(contentState);
  const solutions = [];
  const formattedRichTextContent = [];
  const newImages = [];
  let solutionTitle = "";
  let currentListItems = [];
  let previousType = "";
  // get each draftjs block and add them to a solutionContent list
  solutionValue?.blocks.forEach(function (block, index, array) {
    if (block.type === "atomic") {
      // first get image data from draftjs state
      const blockState = contentState.getBlockForKey(block.key);
      const imageKey = blockState.getEntityAt(0);
      const imageInstance = contentState.getEntity(imageKey);
      const data = imageInstance.getData();
      const image = FormattedContentObjectFromImage({
        title: data.title,
        description: data.description,
        file: data.file,
      });
      formattedRichTextContent.push(image);
      newImages.push(image);
    } else {
      // Create title from aggregated characters
      if (solutionTitle.length < 80) {
        for (let i = 0; i < block.text.length; i++) {
          if (solutionTitle.length < 80) {
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
            FormattedContentObjectFromList(currentListItems, block.type)
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
  solutions.push({
    sysID: generateTempID(solutionTitle),
    createdAt: new Date().toISOString(),
    id: -1,
    title: generateSolutionTitle(solutionTitle),
    description: {
      nodeType: "document",
      data: {},
      content: formattedRichTextContent,
    },
  });
  const newSolutions = solutions;
  const tags = formatTagsFromValues(values.tags);
  const newTags = tags.map((tag) => {
    if (tag.__isNew__) {
      return tag;
    }
    return [];
  });
  // TODO "additional solutions" go here
  const category = GetCategoryObjectFromID(content, values.category);
  const topicToAdd = {
    id: generateTempID(values.title),
    createdAt: new Date().toISOString(),
    title: values.title,
    slug: encodeURIComponent(values.title.replace(/\s+/g, "-").toLowerCase()),
    tags: tags,
    category: category,
    solutions: solutions,
  };

  return topicToAdd;
}

function formatTagsFromValues(tags) {
  if (tags.length <= 0) {
    return;
  }
  return tags.map(function (tag) {
    return { id: tag.value, name: tag.label };
  });
}

function sendNewTopicDataToContentful(topicToAdd) {
  // create tags
  // .then apply tags topicToAdd
  // if new images, create images before solutions
  // then create new solution
  // ! to scan for images replace their data with the image reponses
  // then create new topic with all the updated data
}

// each of these createNew functions send their respective data to contentful to be added. If any of these fail, the user is notified with a useful link on contentful to fix the issue.
function createNewTag(tag) {
  console.log("create tag");
  console.log(tag);
}

function createNewSolution(solution) {
  console.log("create solutions");
  console.log(solution);
}

function createNewImage(image) {
  console.log("image");
  console.log(image);
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
  const nodeType = getContentfulTextTypeFromDraftJs(type);
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

  return [
    {
      nodeType: nodeType,
      data: {},
      content: list,
    },
  ];
}

function FormattedContentObjectFromImage(image) {
  return {
    nodeType: "image",
    title: image.title,
    description: image.description,
    file: image.file,
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
