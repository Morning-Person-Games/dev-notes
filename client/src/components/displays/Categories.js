import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { theme } from "../../styles/globalStyles";
import { BsGearFill, BsPlusLg } from "react-icons/bs";
import SettingsForm from "../forms/Settings";
import CategoryEntryForm from "../forms/CategoryEntry";
import { toast } from "react-toastify";

const { baseTypes, colors, sizes } = theme;
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
  color: ${colors.white};
  background: none;
  border-style: solid;
  border-color: transparent;
  border-width: 0 0 3px 0;
  transition: border ${baseTypes.transitionSpeed} ease-in;
  -webkit-transition: border ${baseTypes.transitionSpeed} ease-in;
  ${theme.baseTypes.hover} {
    &:enabled {
      border-bottom-color: ${colors.highlight};
    }
  }
  &:disabled {
    cursor: default;
    border-bottom-color: ${colors.highlightHover};
  }
`;
const H2 = styled.h2`
  margin: 0;
  color: ${colors.highlightHover};
`;
const svgBtn = css`
  border: 0;
  cursor: pointer;
  background: none;
  padding: 0;
  display: flex;
  background-color: ${colors.background};
  box-shadow: -4px 0px 7px 3px ${colors.background};
  svg {
    transition: all ${baseTypes.transitionSpeed} ease-in;
    -webkit-transition: all ${baseTypes.transitionSpeed} ease-in;
    font-size: ${sizes.font.xl};
    color: ${colors.highlight};
    position: initial;
    ${baseTypes.hover} {
      color: ${colors.highlightHover};
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
  background-color: ${colors.background};
  box-shadow: -4px 0px 7px 3px ${colors.background};
  button {
    ${svgBtn};
  }
`;
const AddCategoryBtn = styled.button`
  ${svgBtn};
  margin-left: 10px;
`;
function CategoriesHeader({
  topics,
  setCurrentCategory,
  currentCategory,
  setModalContent,
  token,
  setLoading,
  spaceID,
}) {
  const activeCategory = currentCategory.category
    ? currentCategory.category
    : [];
  const links = [];
  if (topics && topics.length > 0) {
    const filtered = topics.filter((category) => category.public || token);
    const sorted = filtered.sort((a, b) => a.weight - b.weight);
    sorted.forEach((category) => {
      if (category.public || token) {
        links.push(
          <Li key={category.id}>
            <Button
              type="button"
              disabled={activeCategory === category.category}
              onClick={() => setCurrentCategory(category)}
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
          <AddCategoryBtn
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
                          render: "Have fun!",
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
          </AddCategoryBtn>
        </Li>
      );
    }
  }
  return (
    <Wrapper>
      <Ul>{links}</Ul>

      <SettingsDiv>
        <button
          type="button"
          to="/settings"
          onClick={() =>
            setModalContent({
              title: "Settings",
              component: <SettingsForm spaceID={spaceID} />,
            })
          }
        >
          <BsGearFill />
        </button>
      </SettingsDiv>
    </Wrapper>
  );
}

export default CategoriesHeader;

CategoriesHeader.defaultProps = {
  topics: [<li key="loading">Loading Categories...</li>],
};
