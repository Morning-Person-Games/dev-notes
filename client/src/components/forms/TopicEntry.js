import React, { useEffect, useState } from "react";
import { withFormik, Field } from "formik";
import * as Yup from "yup";
import { generateTempID } from "../tools/helperFunctions";
import { createNewTopic } from "../tools/topicManagement";
import FormattedTopicEntry from "../tools/entryFormatters";
import { baseTypes, mixins, staticSizes } from "../../styles/globalStyles";
import styled from "@emotion/styled";
import SolutionMd from "./SolutionMd";
import { CreatableSelectField, SelectField } from "./SelectFields";
import { BsTagsFill, BsJournalPlus } from "react-icons/bs";
import { ReactComponent as Logo } from "../../logo.svg";

// styling
const Errors = styled.div`
  color: ${(props) => props.colors.error};
  margin: 5px 0;
  height: 1.4em;
  font-size: 0.8em;
`;
const Submit = styled(baseTypes.DefaultBtn)`
  padding: 12px;
  color: ${(props) => props.theme.colors.white};
  font-size: ${staticSizes.font.lg};
  flex-grow: 1;
  border-radius: 0 0 ${staticSizes.radius} ${staticSizes.radius};
  &:disabled {
    color: ${(props) =>
      props.error
        ? (props) => props.theme.colors.error
        : props.theme.colors.inactiveColor};
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
const RefSolutionIcon = styled(BsJournalPlus)`
  position: absolute;
  margin-top: 5px;
  left: 10px;
  font-size: 1.3em;
  color: ${(props) => props.theme.colors.inactiveColor};
  z-index: 2;
  stroke-width: 0.7;
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

const TopicForm = (props) => {
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
    handleChange,
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

  if (!props.token) {
    return;
  }

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
              if (!values.category || !values.category.category) {
                if (props.currentCategory.category) {
                  setFieldValue("category", {
                    id: props.currentCategory.id,
                    category: props.currentCategory.category,
                    path: props.currentCategory.path,
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
              if (!e.target.value && !values.solution) {
                resetForm();
              }
            }}
            autoFocus
          />
        </FieldWrapper>

        <SolutionMd
          type="textarea"
          name="solution"
          handleChange={handleChange}
          handleBlur={handleBlur}
          defaultTabEnable={true}
          value={values.solution}
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
              tabIndex="3"
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
            tabIndex="4"
          />
          {errors.tags && touched.title && <TagErrors>{errors.tags}</TagErrors>}
        </FieldWrapper>
      </TopicFieldsWrapper>
      <ButtonsWrapper>
        <Submit
          type="submit"
          error={errors.title ? 1 : 0}
          disabled={!isValid || isSubmitting || !hasValue}
        >
          {touched.title ? submitText : "Describe a topic to create a note"}
        </Submit>
      </ButtonsWrapper>
    </FormWrapper>
  );
};

const TopicEntry = withFormik({
  mapPropsToValues: (props) => ({
    title: "",
    category: {
      id: props.currentCategory.id,
      category: props.currentCategory.category,
      path: props.currentCategory.path,
    },
    solution: "",
    refSolutions: [],
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
    const contentToAdd = await FormattedTopicEntry(vals);
    /*
    const contentToAdd = {
      newTags: newTags,
      newSolutions: newSolutions,
      newTopic: topicToAdd,      
    };
    */
    // Workaround to not adjust the alter the content array for contentful submission
    const contentToSend = JSON.parse(JSON.stringify(contentToAdd));
    const { newSolutions, newTopic } = contentToAdd;
    // add details for immediate usage of new content that contentful will generate later:
    newTopic.id = generateTempID(contentToAdd.newTopic.title);
    newTopic.createdAt = new Date().toISOString();

    //! If multiple NEW solutions can be added at a time, this needs to be a loop:
    if (newSolutions && newSolutions.length > 0) {
      newSolutions[0].sysID = generateTempID(newSolutions[0].title);
      newSolutions[0].createdAt = new Date().toISOString();
      newTopic.solutions.unshift(newSolutions[0]);

      // add indexable solutions for js search
      let indexableSolutions = "";
      newTopic.solutions.forEach(
        (solution) => (indexableSolutions += " " + solution.title)
      );
      newTopic.indexableSolutions = indexableSolutions;
      console.log("New (Local) Topic: ", newTopic);
    }
    props.addToContentList(contentToAdd);
    // Send content to contentful
    const createdTopic = await createNewTopic(
      props.token,
      contentToSend,
      props.spaceID
    );
    console.log("Topic Created on Contentful: ", createdTopic);
    resetForm({
      values: {
        title: "",
        solution: "",
        tags: [],
        refSolutions: [],
      },
    });
  },
  displayName: "TopicForm",
})(TopicForm);

export default TopicEntry;
