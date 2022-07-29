import React, { useState, useEffect } from "react";
import DemoTopicEntry from "./DemoTopicEntry";
import Topics from "./Topics";
import CategoriesHeader from "./Categories";
import Startup from "./Startup";
import Modal from "../components/displays/Modal";
import { baseTypes } from "../styles/globalStyles";
import styled from "@emotion/styled";

const DemoFooter = styled.div`
  display: flex;
  z-index: 4000;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  background-color: ${(props) => props.theme.colors.secondary};
  box-shadow: 0 0 4px 4px ${(props) => props.theme.colors.shadow};
  p {
    width: 100%;
    margin: 10px 0;
  }
`;
const DemoContentWrapper = styled(baseTypes.MainContent)`
  margin-bottom: 60px;
`;

function Notes(props) {
  const {
    topics,
    setCurrentCategory,
    currentCategory,
    tags,
    setTopics,
    addToContentList,
    loading,
    setLoading,
    themesObject,
    solutions,
    setLoadScreen,
    setTheme,
    setLoadingFade,
    currentTheme,
    currentTopics,
  } = props;
  const [fade, setFade] = useState(false);
  const [startupOn, setStartupOn] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [topicTitlesList, setTopicTitlesList] = useState([]);

  useEffect(() => {
    if (startupOn) {
      setTimeout(() => {
        setStartupOn(false);
        setFade(false);
      }, 2600);
    }
  }, [startupOn]);
  useEffect(() => {
    const topicTitles = [];
    topics.forEach((category) =>
      category.topics.forEach((topic) => topicTitles.push(topic.title))
    );
    setTopicTitlesList(topicTitles);
  }, [topics]);

  const showStart = startupOn || !props.topics || props.topics.length === 0;

  return (
    <>
      <Modal modalContent={modalContent} setModalContent={setModalContent} />
      {showStart && (
        <Startup
          token={props.token}
          fade={fade}
          setFade={setFade}
          setLoading={setLoading}
          setStartupOn={setStartupOn}
          setTopics={setTopics}
          topics={topics}
        />
      )}
      <DemoContentWrapper>
        <CategoriesHeader
          topics={topics}
          setCurrentCategory={setCurrentCategory}
          currentCategory={currentCategory}
          setModalContent={setModalContent}
          setLoading={setLoading}
          themesObject={themesObject}
          setLoadScreen={setLoadScreen}
          setLoadingFade={setLoadingFade}
          setTheme={setTheme}
          setTopics={setTopics}
          currentTheme={currentTheme}
        />
        <DemoTopicEntry
          currentCategory={currentCategory}
          tags={tags}
          solutions={solutions}
          addToContentList={addToContentList}
          topicTitlesList={topicTitlesList}
        />
        <div>
          <Topics currentTopics={currentTopics} tags={tags} loading={loading} />
        </div>
      </DemoContentWrapper>
      <DemoFooter>
        <p>
          If you're interested in setting up your own instance of Dev Notes,
          check out the setup instructions{" "}
          <a
            href="https://github.com/Morning-Person-Games/dev-notes#setup"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          !
        </p>
      </DemoFooter>
    </>
  );
}

export default Notes;
