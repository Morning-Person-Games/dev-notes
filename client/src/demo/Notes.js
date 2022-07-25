import React, { useState, useEffect } from "react";
import DemoTopicEntry from "./DemoTopicEntry";
import Topics from "./Topics";
import CategoriesHeader from "./Categories";
import Startup from "./Startup";
import Modal from "../components/displays/Modal";
import { baseTypes } from "../styles/globalStyles";

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
      <baseTypes.MainContent>
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
      </baseTypes.MainContent>
    </>
  );
}

export default Notes;
