import React from "react";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { theme } from "../../globalStyles";
import defaultColors from "../../defaultColors";
import createNewCategory from "../tools/categoryManagement";

const { baseTypes, sizes } = theme;
const colors = defaultColors;

//form
const CategoryFormInit = ({ ...props }) => <Form {...props} />;

const CategoryForm = styled(CategoryFormInit)`
  flex-basis: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const FieldInit = ({ ...props }) => <Field {...props} />;

const CategoryField = styled(FieldInit)`
  ${baseTypes.baseModalField};
  &:placeholder-shown {
    text-overflow: ellipsis;
  }
`;

const Label = styled.label`
  font-size: ${sizes.font.md};
  color: ${colors.white};
  max-width: ${sizes.mdCol};
  width: 100%;
  font-weight: 700;
  text-align: left;
`;
const InfoAndErrorDiv = styled.div`
  display: block;
  max-width: ${sizes.mdCol};
  width: 100%;
  color: ${(props) => (props.error ? colors.error : colors.placeholder)};
  text-align: left;
  font-size: ${sizes.font.sm};
  min-height: 20px;
  margin: 5px 0 10px 0;
`;

const VisibilityButtons = styled.div`
  display: flex;
  flex-flow: row nowrap;
  max-width: ${sizes.mdCol};
  width: 100%;
  button {
    flex-basis: 50%;
    width: 100%;
    padding: 10px;
    font-size: ${sizes.font.lg};
    font-weight: 700;
    color: ${colors.inactiveColor};
    background-color: ${colors.primary};
    ${baseTypes.hover} {
      background-color: ${colors.highlight};
    }
    &:disabled {
      background-color: ${colors.highlightHover};
      color: ${colors.white};
      cursor: default;
    }
  }
`;

const WeightWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  max-width: ${sizes.mdCol};
  width: 100%;
  button {
    min-height: ${sizes.font.lg};
    font-size: ${sizes.font.md};
    @media screen and (min-width: ${sizes.mdCol}) {
      font-size: ${sizes.font.lg};
    }
    width: 100%;
    padding: 10px 0;
    justify-content: space-evenly;
    color: ${colors.inactiveColor};
    background-color: ${colors.primary};
    ${baseTypes.hover} {
      background-color: ${colors.highlight};
    }
    &:disabled {
      background-color: ${colors.highlightHover};
      color: ${colors.white};
      cursor: default;
    }
  }
`;

const Submit = styled.button`
  ${baseTypes.baseBtn};
  max-width: ${sizes.mdCol};
  width: 100%;
  padding: 10px;
  font-size: ${sizes.font.xl};
  margin-top: 10px;
`;

const LeftBtn = styled.button`
  ${baseTypes.clickable};
  border-radius: ${sizes.radius} 0 0 ${sizes.radius};
`;
const CenterBtn = styled.button`
  ${baseTypes.clickable};
  border-radius: 0;
`;
const RightBtn = styled.button`
  ${baseTypes.clickable};
  border-radius: 0 ${sizes.radius} ${sizes.radius} 0;
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

function CategoryEntryForm({ token, callback }) {
  if (!token) {
    return;
  }
  return (
    <Formik
      initialValues={{ category: "", visibility: true, weight: 0 }}
      onSubmit={async (values, resetForm) => {
        const newCategory = {
          title: values.category,
          visibility: values.visibility,
          weight: values.weight,
        };
        const createdCategory = await createNewCategory(token, newCategory);
        console.log("New Category: ", createdCategory);
        if (callback) {
          callback();
        }
        resetForm();
      }}
      validationSchema={validationSchema}
    >
      {({ values, touched, errors, setFieldValue, isSubmitting }) => (
        <CategoryForm>
          <Label htmlFor="category">Title:</Label>
          <CategoryField
            type="text"
            name="category"
            placeholder='Try "Video Editing" or "Game Dev" or "5e Builds" ...'
            maxLength="60"
            autoComplete="off"
            autoFocus
          />
          <InfoAndErrorDiv error={1}>
            {touched.category && errors.category && errors.category}
          </InfoAndErrorDiv>
          <Label htmlFor="visibility">Visibility:</Label>
          <VisibilityButtons>
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
          <InfoAndErrorDiv>
            This controls visibility of headers to unauthenticated viewers.
            However,{" "}
            <b>
              published content is always publically available through
              Contentful.
            </b>
          </InfoAndErrorDiv>
          <Label htmlFor="weight">Weight:</Label>
          <WeightWrapper>
            <WeightButtons
              setFieldValue={setFieldValue}
              currentValue={values.weight}
            />
          </WeightWrapper>
          <InfoAndErrorDiv>
            The lower the weight, the farther left the Category header will sit.
          </InfoAndErrorDiv>
          <Submit
            type="submit"
            disabled={
              isSubmitting || values.category.length === 0 || errors.category
            }
          >
            Submit
          </Submit>
          {errors.visibility && (
            <InfoAndErrorDiv>{errors.visibility}</InfoAndErrorDiv>
          )}
          {errors.weight && <InfoAndErrorDiv>{errors.weight}</InfoAndErrorDiv>}
        </CategoryForm>
      )}
    </Formik>
  );
}

export default CategoryEntryForm;
