import React, { useState } from "react";
import { withFormik, Field, Formik } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { theme } from "../../globalStyles";
import defaultColors from "../../defaultColors";
import { lighten } from "polished";

const { baseTypes, sizes } = theme;
const colors = defaultColors;
const boldHighlight = lighten(0.2, colors.link);
// init text
const Wrapper = styled.div`
  display: block;
  width: 100%;
  text-align: center;
`;
const Title = styled.h1`
  margin-bottom: 0;
  text-align: center;
`;
const SubtitleWrapper = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  h4 {
    color: ${colors.inactiveColor};
    font-weight: 400;
    margin-top: 0;
    width: 60%;
  }
`;
const P = styled.p`
  margin: 0.5em 0;
  display: block;
`;
const Small = styled.p`
  margin: 0;
  font-size: ${sizes.font.xs};
`;
const B = styled.b`
  color: ${boldHighlight};
`;
const H3 = styled.h3`
  margin: 10px 0 0 0;
`;

//form
const CategoryFieldInit = ({ ...props }) => <Field {...props} />;

const CategoryField = styled(CategoryFieldInit)`
  ${baseTypes.baseInput};
  font-size: ${sizes.font.lg};
  width: 300px;
`;

function InitConfigForm() {
  return (
    <Wrapper>
      <Title>Welcome to Dev Notes!</Title>
      <SubtitleWrapper>
        <h4>
          A digital journal specifically streamlined to quickly jot down
          important thoughts and quickly find them later.
        </h4>
      </SubtitleWrapper>
      <h2>Name your first Category to get started:</h2>
      <Formik>
        <CategoryField
          type="text"
          name="category"
          placeholder='Try "Video Editing" or "Game Dev"'
          maxLength="255"
          tabIndex="1"
          autoFocus
        />
      </Formik>
      <H3>Description and Tips:</H3>
      <P style={{ marginBottom: "3px" }}>
        Notes, better known as <B>Topics*</B>, are typically made up of a title,
        a <B>Solution</B>, and <B>Tags</B>. Topics can have have any number of
        solutions, and are categorized in...<B>Categories</B>. Categories define
        which topics can be found when you start typing in the search bar, so
        they are very impactful. If you find that you're not sure what category
        a Topic would be found in it is likely you should make them more broad.
        As an example, I'm using Game Dev, Web Dev, and Misc as my current
        categories (and Misc will be used sparingly and typically for keyboard
        shortcuts in various apps).
      </P>
      <Small>
        *cause what the heck does <i>Dev Topics</i> even mean?!
      </Small>
    </Wrapper>
  );
}

function ConfigForm() {
  return <h3>Options:</h3>;
}

export { InitConfigForm, ConfigForm };
