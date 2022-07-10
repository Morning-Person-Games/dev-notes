import React, { useState, useEffect } from "react";
import TopicForm from "../forms/TopicEntry";
import TopicsView from "../displays/TopicsView";
import CategoriesHeader from "../displays/Categories";
import Startup from "../displays/Startup";
import Modal from "../displays/Modal";
import styled from "@emotion/styled";
import { theme } from "../../styles/globalStyles";

// styling
const { sizes } = theme;
const TopicSection = styled.div`
  display: block;
`;
const MainContent = styled.div`
  ${sizes.colWidth};
  display: block;
`;
const LoginButton = styled.a`
  ${theme.baseTypes.button};
  width: 100%;
  max-width: ${theme.sizes.mdCol};
  font-size: 2em;
  margin-bottom: 10px;
  padding: 8px 0;
  text-align: center;
  text-decoration: none;
`;
const LoginButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function Notes(props) {
  const [fade, setFade] = useState(false);
  const [startupOn, setStartupOn] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  useEffect(() => {
    if (startupOn) {
      setTimeout(() => {
        setStartupOn(false);
        setFade(false);
      }, 2600);
    }
  }, [startupOn]);

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
  } = props;

  const showStart = startupOn || !props.topics || props.topics.length === 0;

  return (
    <>
      <Modal modalContent={modalContent} setModalContent={setModalContent} />
      <MainContent>
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
        />
        {token ? (
          <TopicForm
            token={token}
            currentCategory={currentCategory}
            tags={tags}
            setTopics={setTopics}
            addToContentList={addToContentList}
            spaceID={spaceID}
          />
        ) : (
          <LoginButtonWrapper>
            <LoginButton href="/login">Login</LoginButton>
          </LoginButtonWrapper>
        )}
        <TopicSection>
          <TopicsView
            currentTopics={currentCategory.topics}
            tags={tags}
            spaceID={spaceID}
            token={token}
            loading={loading}
          />
        </TopicSection>
      </MainContent>
    </>
  );
}

export default Notes;
