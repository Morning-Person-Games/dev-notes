import React, { useEffect, useState } from "react";
import { withFormik, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { generateTempID } from "../components/tools/helperFunctions";
import FormattedTopicEntry from "../components/tools/entryFormatters";
import { baseTypes, mixins, staticSizes } from "../styles/globalStyles";
import styled from "@emotion/styled";
import SolutionMd from "../components/forms/SolutionMd";
import {
  CreatableSelectField,
  SelectField,
} from "../components/forms/SelectFields";
import {
  BsTagsFill,
  BsJournalPlus,
  BsCollection,
  BsJournalMinus,
} from "react-icons/bs";
import { ReactComponent as Logo } from "../logo.svg";

// styling
const Errors = styled.div`
  color: ${(props) => props.theme.colors.error};
  margin: 5px 0;
  height: 1.4em;
  font-size: 0.8em;
`;
const Submit = styled(baseTypes.DefaultBtn)`
  padding: 9px 12px 12px 12px;
  color: ${(props) => props.theme.colors.white};
  font-size: ${staticSizes.font.lg};
  flex-grow: 1;
  border-radius: 0 0 ${staticSizes.radius} ${staticSizes.radius};
  border-top: 3px solid ${(props) => props.theme.colors.highlight};
  &:disabled {
    background-color: ${(props) => props.theme.colors.secondary};
    border-color: ${(props) => props.theme.colors.primary};
    color: ${(props) =>
      props.error
        ? (props) => props.theme.colors.error
        : props.theme.colors.inactiveColor};
  }
  &:disabled:hover {
    border-color: ${(props) => props.theme.colors.primary};
  }
  &:hover {
    border-color: ${(props) => props.theme.colors.highlightHover};
  }
`;
const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: none;
`;

const FieldInit = (props) => <Field {...props} />;
// issue with styled and formik work around
const TitleField = styled(FieldInit)`
  border: 0;
  border-radius: ${staticSizes.radius} ${staticSizes.radius} 0 0;
  background: none;
  padding: 10px 10px 10px 1.9em;
  min-height: 2em;
  font-size: ${staticSizes.font.h3n}em;
  ${mixins.transition("all", 200)};
  position: relative;
  &:hover {
    background-color: ${(props) => props.theme.colors.fieldHover};
  }
  &:hover:focus-within {
    background-color: ${(props) => props.theme.colors.secondary};
  }
  &:focus-within {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;
const FormWrapper = styled.form`
  padding-bottom: 0;
  margin-bottom: 10px;
  font-size: 1rem;
`;

const TopicFieldsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: ${(props) => props.theme.colors.secondary};
  border-radius: ${staticSizes.radius} ${staticSizes.radius} 0 0;
  input {
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box; /* Firefox, other Gecko */
    box-sizing: border-box; /* Opera/IE 8+ */
  }
`;

const FieldWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;

//BsSearch
const TagIcon = styled(BsTagsFill)`
  position: absolute;
  margin-top: 3px;
  left: 12px;
  font-size: ${staticSizes.font.lg};
  color: ${(props) => props.theme.colors.inactiveColor};
  z-index: 2;
  pointer-events: none;
`;
const TopicIcon = styled(Logo)`
  position: absolute;
  margin-top: 3px;
  left: 12px;
  font-size: 1.1em;
  color: ${(props) => props.theme.colors.inactiveColor};
  z-index: 2;
  pointer-events: none;
`;
const RefSolutionIcon = styled(BsCollection)`
  position: absolute;
  margin-top: 5px;
  left: 10px;
  font-size: 1.3em;
  color: ${(props) => props.theme.colors.inactiveColor};
  z-index: 2;
  stroke-width: 0.5;
  pointer-events: none;
`;

const TagErrors = styled.div`
  display: block;
  background-color: ${(props) => props.theme.colors.secondary};
  border-top: 1px solid ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.error};
  padding: 5px 5px 5px 12px;
  font-size: ${staticSizes.font.sm};
  width: 100%;
`;

const SelectInit = ({ ...props }) => <SelectField {...props} />;

const SolutionsSelect = styled(SelectInit)`
  border-top: 3px solid ${(props) => props.theme.colors.primary};
  border-radius: 0;
  .select__control .select__value-container {
    padding-left: 1.4em;
  }
`;

const TagsField = styled(FieldInit)`
  border-top: 3px solid ${(props) => props.theme.colors.primary};
  border-radius: 0;

  .select__control .select__value-container {
    padding-left: 1.4em;
  }
`;
const MoreSolutionBtn = styled.button`
  border: 0;
  background-color: transparent;
  padding: 5px 5px 5px ${mixins.fixedEm(1.4)};
  margin: 2px 4px 2px 0;
  text-align: left;
  position: relative;
  color: ${(props) => props.theme.colors.highlight};
  font-size: ${mixins.fixedEm(1.1)};
  ${mixins.transition()};
  bottom: 0;
  &:hover {
    color: ${(props) => props.theme.colors.highlightHover};
    svg {
      color: ${(props) => props.theme.colors.highlightHover};
    }
  }
  &:hover:focus-within {
    background-color: transparent;
  }
  &:focus-within {
    background-color: transparent;
  }
  svg {
    ${mixins.transition()};
    position: absolute;
    margin-top: 5px;
    left: 2px;
    font-size: ${mixins.fixedEm(0.9)};
    z-index: 2;
    stroke-width: 0.7;
  }
`;
const SolutionsActionsBar = styled.div`
  display: block;
  padding: 0px 5px;
  border-radius: 3.5px;
  margin: 5px;
  background-color: ${(props) => props.theme.colors.primary};
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`;
const SolutionWrapper = styled.div`
  ${mixins.transition("background-color", 200)};
  position: relative;
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  //padding-bottom: 2.6em;
  &:hover {
    background-color: ${(props) => props.theme.colors.fieldHover};
  }
  &:hover:focus-within {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;

const DemoTopicForm = (props) => {
  const [hasValue, setHasValue] = useState(false);
  const [tagOptions, setTagsOptions] = useState([]);
  const [solutionOptions, setSolutionOptions] = useState([]);
  const {
    values,
    touched,
    errors,
    setFieldValue,
    handleSubmit,
    isSubmitting,
    handleBlur,
    resetForm,
    isValid,
    tags,
    solutions,
    setTouched,
  } = props;

  useEffect(() => {
    const newSolutionsList = [];
    if (solutions?.length > 0) {
      solutions.forEach((solution) => {
        newSolutionsList.push({ value: solution.sysID, label: solution.title });
      });
    }
    setSolutionOptions(newSolutionsList);
  }, [solutions]);

  useEffect(() => {
    const newTagsList = [];
    if (tags?.length > 0) {
      tags.forEach((tag) => {
        newTagsList.push({ value: tag.id, label: tag.name });
      });
    }
    setTagsOptions(newTagsList);
  }, [tags]);

  const submitText = errors.title ? errors.title : "Create Note";

  return (
    <FormWrapper id="NoteEntry" onSubmit={handleSubmit}>
      {errors.category && touched.title && <Errors>{errors.category}</Errors>}
      <TopicFieldsWrapper>
        <FieldWrapper>
          <TopicIcon />
          <TitleField
            type="text"
            name="title"
            placeholder="Describe a topic for your note..."
            onChange={(e) => {
              if (!touched.title) {
                setTouched({ title: true });
              }
              if (
                !values.category ||
                !values.category.category ||
                values.category.category !== props.currentCategory.category
              ) {
                if (props.currentCategory.category) {
                  setFieldValue("category", {
                    id: props.currentCategory.id,
                    category: props.currentCategory.category,
                  });
                }
              }
              setFieldValue("title", e.target.value);
              // this may not look like it matches the validator but it will
              setHasValue(e.target.value.length > 0);
            }}
            maxLength="255"
            tabIndex="1"
            onBlur={(e) => {
              if (
                !e.target.value &&
                !values.solutions &&
                !values.tag &&
                !values.refSolutions
              ) {
                resetForm();
              }
            }}
            autoFocus
          />
        </FieldWrapper>
        <FieldArray
          name="solutions"
          render={(arrayHelpers) => {
            return values.solutions.map((solution, index) => (
              <SolutionWrapper key={index}>
                <Field
                  name={`solutions.${index}`}
                  defaultTabEnable={true}
                  tabIndex={index + 1}
                  as={SolutionMd}
                  type="textarea"
                  placeholder={
                    index > 0
                      ? "Describe another solution..."
                      : "Describe a solution to the topic..."
                  }
                />
                <SolutionsActionsBar>
                  <MoreSolutionBtn
                    type="button"
                    onClick={() => arrayHelpers.push("")}
                  >
                    <BsJournalPlus />
                    <b>Add</b> a Solution
                  </MoreSolutionBtn>
                  {index > 0 && (
                    <MoreSolutionBtn
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      <BsJournalMinus />
                      <b>Remove</b> this Solution
                    </MoreSolutionBtn>
                  )}
                </SolutionsActionsBar>
              </SolutionWrapper>
            ));
          }}
        />
        {solutionOptions.length > 0 && (
          <FieldWrapper>
            <RefSolutionIcon />
            <SolutionsSelect
              isMulti={true}
              name="refSolutions"
              placeholder="Type to add more solutions..."
              options={solutionOptions}
              isSearchable={true}
              tabIndex={values.solutions?.length + 2}
              handleBlur={handleBlur}
              noOptionsMessage={() => "No solutions found."}
              onChange={(values) => {
                setFieldValue("refSolutions", values);
              }}
            />
          </FieldWrapper>
        )}
        {errors.refSolutions && touched.title && (
          <TagErrors>{errors.refSolutions}</TagErrors>
        )}
        <FieldWrapper>
          <TagIcon />
          <TagsField
            name="tags"
            component={CreatableSelectField}
            placeholder="Type to create and pick tags..."
            noOptionsMessage={() =>
              "No tags found. Start typing to create one..."
            }
            options={tagOptions}
            tabIndex={values.solutions?.length + 3}
          />
          {errors.tags && touched.title && <TagErrors>{errors.tags}</TagErrors>}
        </FieldWrapper>
      </TopicFieldsWrapper>
      <ButtonsWrapper>
        <Submit
          type="submit"
          error={errors.title ? 1 : 0}
          disabled={
            !isValid || isSubmitting || !hasValue || values.title.length === 0
          }
        >
          {touched.title ? submitText : "Describe a topic to create a note"}
        </Submit>
      </ButtonsWrapper>
    </FormWrapper>
  );
};

const DemoTopicEntry = withFormik({
  mapPropsToValues: (props) => ({
    title: "",
    category: {
      id: props.currentCategory.id,
      category: props.currentCategory.category,
    },
    solutions: [""],
    refSolutions: [],
    tags: [],
  }),
  validationSchema: (props) =>
    Yup.object().shape({
      title: Yup.string()
        .min(3, "Topic title too short!")
        .max(255, "Topic title too long!")
        .required("Topic title required")
        .test(
          "Unique Title",
          "A Note with the same title was found.",
          (value) => !props.topicTitlesList.includes(value)
        ),
      category: Yup.object().required(
        "Please create or select a category above to add new topics."
      ),
      tags: Yup.array().of(
        Yup.object().shape({
          label: Yup.string()
            .max(255, "Tags can be no longer than 255 characters")
            .required(),
          value: Yup.string().required(),
        })
      ),
    }),
  handleSubmit: async (values, { props, resetForm }) => {
    const refSolutions = values.refSolutions.map((ref) => {
      return props.solutions.find((solution) => ref.value === solution.sysID);
    });
    const vals = values;
    vals.refSolutions = refSolutions;
    vals.category = props.currentCategory;
    if (values.solutions.length === 1 && values.solutions[0].length === 0) {
      vals.solutions = [];
    }
    const contentToAdd = await FormattedTopicEntry(vals);
    /*
    const contentToAdd = {
      newTags: newTags,
      newSolutions: newSolutions,
      newTopic: topicToAdd,      
    };
    */
    // Workaround to not adjust the alter the content array for contentful submission
    const { newSolutions, newTopic, newTags } = contentToAdd;
    // add details for immediate usage of new content that contentful will generate later:
    newTopic.id = generateTempID(contentToAdd.newTopic.title);
    newTopic.createdAt = new Date().toISOString();

    if (newSolutions && newSolutions.length > 0) {
      for (let i = newSolutions.length - 1; i >= 0; i--) {
        newSolutions[i].sysID = generateTempID(newSolutions[i].title);
        newSolutions[i].createdAt = new Date().toISOString();
        newTopic.solutions.unshift(newSolutions[i]);
      }
    }
    if (newTopic.solutions.length > 0) {
      // add indexable solutions for js search
      let indexableSolutions = "";
      newTopic.solutions.forEach(
        (solution) => (indexableSolutions += " " + solution.title)
      );
      newTopic.indexableSolutions = indexableSolutions;
    }
    if (newTags && newTags.length > 0) {
      newTags.forEach((tag) => {
        newTopic.tags.push(tag);
      });
    }
    props.addToContentList(contentToAdd);
    console.info("New (Local) Topic: ", newTopic);
    resetForm({
      values: {
        category: {
          id: props.currentCategory.id,
          category: props.currentCategory.category,
        },
        title: "",
        solutions: [""],
        tags: [],
        refSolutions: [],
      },
    });
  },
  displayName: "DemoTopicForm",
})(DemoTopicForm);

export default DemoTopicEntry;
