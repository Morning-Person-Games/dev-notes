import React from "react";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { baseTypes, staticSizes } from "../../styles/globalStyles";
import createNewCategory from "../tools/categoryManagement";
import defaultSizes from "../../styles/defaultSizes";

//styling
const CategoryFormInit = ({ ...props }) => <Form {...props} />;

const CategoryForm = styled(CategoryFormInit)`
  flex-basis: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled(baseTypes.Label)`
  text-align: left;
  max-width: ${(props) => props.startup === 1 && defaultSizes.lgCol};
`;
const InfoAndErrorDiv = styled(baseTypes.FieldHelperText)`
  margin: 5px 0 10px 0;
  color: ${(props) =>
    props.error ? props.theme.colors.error : props.theme.colors.placeholder};
  max-width: ${(props) => props.startup === 1 && defaultSizes.lgCol};
`;

const VisibilityButtons = styled.div`
  display: flex;
  flex-flow: row nowrap;
  max-width: ${(props) =>
    props.startup === 1 ? defaultSizes.lgCol : props.theme.sizes.mdCol};
  width: 100%;
  button {
    flex-basis: 50%;
    width: 100%;
    padding: 10px;
    font-size: ${staticSizes.font.lg};
    font-weight: 700;
    color: ${(props) => props.theme.colors.inactiveColor};
    background-color: ${(props) =>
      props.startup === 1
        ? props.theme.colors.secondary
        : props.theme.colors.primary};
    ${baseTypes.hover} {
      background-color: ${(props) =>
        props.startup === 1
          ? props.theme.colors.reverseFieldHover
          : props.theme.colors.fieldHover};
    }
    &:disabled {
      background-color: ${(props) => props.theme.colors.highlight};
      color: ${(props) => props.theme.colors.white};
      cursor: default;
    }
  }
`;

const WeightWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  max-width: ${(props) =>
    props.startup === 1 ? defaultSizes.lgCol : props.theme.sizes.mdCol};
  width: 100%;
  button {
    min-height: ${staticSizes.font.lg};
    font-size: ${staticSizes.font.md};
    @media screen and (min-width: ${(props) => props.theme.sizes.mdCol}) {
      font-size: ${staticSizes.font.lg};
    }
    width: 100%;
    padding: 10px 0;
    justify-content: space-evenly;
    color: ${(props) => props.theme.colors.inactiveColor};
    background-color: ${(props) =>
      props.startup
        ? props.theme.colors.secondary
        : props.theme.colors.primary};
    ${baseTypes.hover} {
      background-color: ${(props) =>
        props.startup
          ? props.theme.colors.reverseFieldHover
          : props.theme.colors.fieldHover};
    }
    &:disabled {
      background-color: ${(props) => props.theme.colors.highlight};
      color: ${(props) => props.theme.colors.white};
      cursor: default;
    }
  }
`;

const Submit = styled(baseTypes.DefaultBtn)`
  max-width: ${(props) =>
    props.startup === 1 ? defaultSizes.lgCol : props.theme.sizes.mdCol};
  width: 100%;
  padding: 10px;
  font-size: ${staticSizes.font.xl};
  margin-top: 10px;
  &:disabled {
    color: ${(props) =>
      props.startup === 1 && props.theme.colors.inactiveColor};
    background-color: ${(props) =>
      props.startup === 1 && props.theme.colors.secondary};
  }
`;

const LeftBtn = styled.button`
  border-radius: ${staticSizes.radius} 0 0 ${staticSizes.radius};
`;
const CenterBtn = styled.button`
  border-radius: 0;
`;
const RightBtn = styled.button`
  border-radius: 0 ${staticSizes.radius} ${staticSizes.radius} 0;
`;

const TitleField = styled(baseTypes.ModalField)`
  padding: 10px;
  border-radius: ${staticSizes.radius};
  background: ${(props) => props.startup === 1 && props.theme.colors.secondary};
  max-width: ${(props) => props.startup === 1 && defaultSizes.lgCol};
  &:hover {
    background-color: ${(props) =>
      props.startup === 1 && props.theme.colors.fieldHover};
  }
`;

const WeightButtons = ({ setFieldValue, currentValue }) => {
  const list = [];
  for (let i = -5; i <= 5; i++) {
    if (i === -5) {
      list.push(
        <LeftBtn
          key={i}
          type="button"
          value={i}
          onClick={() => {
            setFieldValue("weight", i);
          }}
          disabled={currentValue === i ? true : false}
        >
          {i}
        </LeftBtn>
      );
      continue;
    }
    if (i === 5) {
      list.push(
        <RightBtn
          key={i}
          type="button"
          value={i}
          onClick={() => {
            setFieldValue("weight", i);
          }}
          disabled={currentValue === i ? true : false}
        >
          {i}
        </RightBtn>
      );
      continue;
    }
    list.push(
      <CenterBtn
        key={i}
        type="button"
        value={i}
        onClick={() => {
          setFieldValue("weight", i);
        }}
        disabled={currentValue === i ? true : false}
      >
        {i}
      </CenterBtn>
    );
  }
  return list;
};

const validationSchema = Yup.object().shape({
  category: Yup.string()
    .min(4, "Category title too short!")
    .max(60, "Category title too long!")
    .matches(
      /^[a-zA-Z0-9_-]+( [a-zA-Z0-9_-]+)*$/,
      "Categories cannot have any symbols except - and _."
    )
    .required("Category title required"),
  visibility: Yup.bool().required("Please select the categories visibilty."),
  weight: Yup.number().min(-5).max(5),
});

function CategoryEntryForm({ token, startup, callback, spaceID }) {
  if (!token) {
    return;
  }
  return (
    <Formik
      initialValues={{ category: "", visibility: true, weight: 0 }}
      onSubmit={async (values, { resetForm }) => {
        const newCategory = {
          title: values.category,
          visibility: values.visibility,
          weight: values.weight,
          topics: [],
        };
        const createdCategory = await createNewCategory(
          token,
          newCategory,
          spaceID
        );
        console.info("New Category: ", createdCategory);
        if (callback) {
          callback();
        }
        resetForm();
      }}
      validationSchema={validationSchema}
    >
      {({ values, touched, errors, setFieldValue, isSubmitting }) => (
        <CategoryForm>
          <Label htmlFor="category" startup={startup ? 1 : 0}>
            Title:
          </Label>
          <TitleField
            as={Field}
            startup={startup ? 1 : 0}
            type="text"
            name="category"
            placeholder='Try "Video Editing" or "Game Dev" or "5e Builds" or "Web Dev" or "Shortcuts"'
            maxLength="60"
            autoComplete="off"
            autoFocus
          />
          <InfoAndErrorDiv error={1} startup={startup ? 1 : 0}>
            {touched.category && errors.category && errors.category}
          </InfoAndErrorDiv>
          <Label htmlFor="visibility" startup={startup ? 1 : 0}>
            Visibility:
          </Label>
          <VisibilityButtons startup={startup ? 1 : 0}>
            <LeftBtn
              type="button"
              disabled={values.visibility ? true : false}
              onClick={() => setFieldValue("visibility", true)}
            >
              Visible
            </LeftBtn>
            <RightBtn
              type="button"
              disabled={values.visibility ? false : true}
              onClick={() => setFieldValue("visibility", false)}
            >
              Hidden
            </RightBtn>
          </VisibilityButtons>
          <InfoAndErrorDiv startup={startup ? 1 : 0}>
            This controls visibility of headers to unauthenticated viewers.
            However,{" "}
            <b>
              published content is always publically available through
              Contentful.
            </b>
          </InfoAndErrorDiv>
          <Label htmlFor="weight" startup={startup ? 1 : 0}>
            Weight:
          </Label>
          <WeightWrapper startup={startup ? 1 : 0}>
            <WeightButtons
              setFieldValue={setFieldValue}
              currentValue={values.weight}
            />
          </WeightWrapper>
          <InfoAndErrorDiv startup={startup ? 1 : 0}>
            The lower the weight, the farther left the Category header will sit.
          </InfoAndErrorDiv>
          <Submit
            type="submit"
            disabled={
              isSubmitting || values.category.length === 0 || errors.category
            }
            startup={startup ? 1 : 0}
          >
            Submit
          </Submit>
          {errors.visibility && (
            <InfoAndErrorDiv startup={startup ? 1 : 0}>
              {errors.visibility}
            </InfoAndErrorDiv>
          )}
          {errors.weight && (
            <InfoAndErrorDiv startup={startup ? 1 : 0}>
              {errors.weight}
            </InfoAndErrorDiv>
          )}
        </CategoryForm>
      )}
    </Formik>
  );
}

export default CategoryEntryForm;
