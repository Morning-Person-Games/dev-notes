import React, { useState, useEffect } from "react";
import TopicForm from "../forms/TopicEntry";
import Topics from "../displays/Topics";
import CategoriesHeader from "../displays/Categories";
import Startup from "../displays/Startup";
import Modal from "../displays/Modal";
import styled from "@emotion/styled";
import { baseTypes, staticSizes } from "../../styles/globalStyles";

// #region styling
const TopicSection = styled.div`
  display: block;
`;
const LoginButton = styled(baseTypes.DefaultBtn)`
  width: 100%;
  max-width: ${(props) => props.theme.sizes.mdCol};
  font-size: 2em;
  margin-bottom: 10px;
  padding: 8px 0;
  text-align: center;
  text-decoration: none;
  border-radius: ${staticSizes.radius};
  color: ${(props) => props.theme.colors.white};
  ${baseTypes.hover} {
    color: ${(props) => props.theme.colors.white};
  }
  &:link {
    color: ${(props) => props.theme.colors.white};
  }
`;
const LoginButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
// #endregion

function Notes(props) {
  const [fade, setFade] = useState(false);
  const [startupOn, setStartupOn] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const {
    topics,
    setCurrentCategory,
    currentCategory,
    token,
    tags,
    setTopics,
    addToContentList,
    spaceID,
    loading,
    setLoading,
    themesObject,
    solutions,
  } = props;

  useEffect(() => {
    if (startupOn) {
      setTimeout(() => {
        setStartupOn(false);
        setFade(false);
      }, 2600);
    }
  }, [startupOn]);
  const showStart = startupOn || !props.topics || props.topics.length === 0;

  return (
    <>
      <Modal modalContent={modalContent} setModalContent={setModalContent} />
      <baseTypes.MainContent>
        {showStart && (
          <Startup
            token={props.token}
            fade={fade}
            setFade={setFade}
            setLoading={props.setLoading}
            setStartupOn={setStartupOn}
            spaceID={spaceID}
          />
        )}
        <CategoriesHeader
          topics={topics}
          setCurrentCategory={setCurrentCategory}
          currentCategory={currentCategory}
          setModalContent={setModalContent}
          setLoading={setLoading}
          token={token}
          spaceID={spaceID}
          themesObject={themesObject}
        />
        {token ? (
          <TopicForm
            token={token}
            currentCategory={currentCategory}
            tags={tags}
            solutions={solutions}
            setTopics={setTopics}
            addToContentList={addToContentList}
            spaceID={spaceID}
          />
        ) : (
          <LoginButtonWrapper>
            <LoginButton as="a" href="/login">
              Login
            </LoginButton>
          </LoginButtonWrapper>
        )}
        <TopicSection>
          <Topics
            currentTopics={currentCategory.topics}
            tags={tags}
            spaceID={spaceID}
            token={token}
            loading={loading}
          />
        </TopicSection>
      </baseTypes.MainContent>
    </>
  );
}

export default Notes;
