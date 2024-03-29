import React from "react";
import styled from "@emotion/styled";
import { baseTypes, staticSizes, mixins } from "../../styles/globalStyles";
import { BsSliders, BsPlusLg } from "react-icons/bs";
import SettingsForm from "../forms/Settings";
import CategoryEntryForm from "../forms/CategoryEntry";
import { toast } from "react-toastify";

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;
  position: relative;
`;
const Ul = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;
  padding: 0;
  margin: 0;
  white-space: nowrap;
  overflow-x: auto;
  margin: 5px 0 0 0;
  padding-bottom: 3px;
`;
const Li = styled.li`
  display: inline-block;
`;
const Button = styled.button`
  cursor: pointer;
  margin: 0;
  padding: 10px;
  color: ${(props) => props.theme.colors.highlight};
  background: none;
  border-radius: 0;
  border-style: solid;
  border-color: transparent;
  border-width: 0 0 3px 0;
  ${mixins.transition("border")};
  ${baseTypes.hover} {
    &:enabled {
      border-bottom-color: ${(props) => props.theme.colors.primary};
    }
  }
  &:disabled {
    cursor: default;
    border-bottom-color: ${(props) => props.theme.colors.highlight};
  }
`;
const H2 = styled.h2`
  margin: 0;
  color: ${(props) => props.theme.colors.highlight};
`;

const SvgBtn = styled.button`
  border: 0;
  cursor: pointer;
  background: none;
  padding: 0;
  display: flex;
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: -4px 0px 7px 3px ${(props) => props.theme.colors.background};
  svg {
    ${mixins.transition()};
    font-size: ${staticSizes.font.xl};
    color: ${(props) => props.theme.colors.highlight};
    position: initial;
    ${baseTypes.hover} {
      color: ${(props) => props.theme.colors.highlightHover};
    }
  }
`;
const SettingsDiv = styled.div`
  position: absolute;
  right: 0;
  top: 2px;
  height: 100%;
  padding: 0 0 0 5px;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: -4px 0px 7px 3px ${(props) => props.theme.colors.background};
`;

const SettingsIcon = styled(BsSliders)`
  stroke-width: 0.6;
`;

function CategoriesHeader({
  topics,
  setCurrentCategory,
  currentCategory,
  setModalContent,
  token,
  setLoading,
  spaceID,
  themesObject,
  setLoadScreen,
  setTheme,
  setLoadingFade,
}) {
  const activeCategory = currentCategory.category
    ? currentCategory.category
    : "";
  const links = [];
  if (topics && topics.length > 0) {
    const filteredTopics = topics.filter(
      (category) => category.public || token
    );
    const sortedTopics = filteredTopics.sort((a, b) => a.weight - b.weight);
    sortedTopics.forEach((category) => {
      if (category.public || token) {
        links.push(
          <Li key={category.id}>
            <Button
              type="button"
              disabled={activeCategory === category.category}
              onClick={() => setCurrentCategory(category.category)}
            >
              <H2>{category.category}</H2>
            </Button>
          </Li>
        );
      }
    });
    if (token) {
      links.push(
        <Li key={"add"}>
          <SvgBtn
            style={{ marginLeft: "10px" }}
            type="button"
            onClick={() =>
              setModalContent({
                title: "Create a Category",
                component: (
                  <CategoryEntryForm
                    token={token}
                    spaceID={spaceID}
                    callback={() => {
                      setModalContent(null);
                      setLoading(true);
                      const notifID = toast.loading("Setting category up...");
                      setTimeout(() => {
                        toast.update(notifID, {
                          render: "Category created!",
                          type: "success",
                          isLoading: false,
                          autoClose: 3000,
                        });
                      }, 1600);
                    }}
                  />
                ),
              })
            }
          >
            <BsPlusLg />
          </SvgBtn>
        </Li>
      );
    }
  }
  return (
    <Wrapper id="Header">
      <Ul>{links}</Ul>
      {topics && topics.length > 0 && (
        <SettingsDiv>
          <SvgBtn
            type="button"
            onClick={() =>
              setModalContent({
                title: "Settings",
                component: (
                  <SettingsForm
                    spaceID={spaceID}
                    themesObject={themesObject}
                    setLoadScreen={setLoadScreen}
                    setModalContent={setModalContent}
                    setLoadingFade={setLoadingFade}
                    setTheme={setTheme}
                  />
                ),
              })
            }
          >
            <SettingsIcon />
          </SvgBtn>
        </SettingsDiv>
      )}
    </Wrapper>
  );
}

export default CategoriesHeader;

CategoriesHeader.defaultProps = {
  topics: [<li key="loading">Loading Categories...</li>],
};
