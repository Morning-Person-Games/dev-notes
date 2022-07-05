import React from "react";
import CreatableSelect from "react-select/creatable";
import { createTagID } from "../tools/HelperFunctions";
import styled from "@emotion/styled";
import { theme } from "../../globalStyles";

const { sizes, colors } = theme;

const TagsSelectPass = (props) => (
  <CreatableSelect classNamePrefix="tags" {...props} />
);

const TagsSelect = styled(TagsSelectPass)`
  width: 100%;
  .tags__control {
    :focus-visible {
      outline: none;
    }
    padding: 10px;
    cursor: text;
    background: ${colors.primary};
    border: none;
    color: ${colors.white};
    width: 100%;
    background: none;
    padding: 7px 10px 5px 11px;
    border-radius: 0;
    border-bottom: 0;
    min-height: 2em;
    font-size: ${sizes.font.lg};
    box-shadow: none;
    &:hover {
      border-color: ${colors.primary};
    }
    .tags__indicators {
      cursor: pointer;
    }
    .tags__value-container {
      padding: 0 5px 0 0;
      .tags__placeholder {
        color: ${colors.placeholder};
      }
      .tags__input-container {
        :focus-visible {
          outline: none;
        }
        margin: 0 0 0 2px;
        padding: 0;
        color: ${colors.white};
      }
      .tags__multi-value {
        cursor: pointer;
        background-color: ${colors.primary};
        color: ${colors.white};
        .tags__multi-value__label {
          color: ${colors.white};
          padding-right: 6px;
        }
        .tags__multi-value__remove {
          padding-left: 2px;
          padding-right: 2px;
          border-radius: 0 2px 2px 0;
          &:hover {
            color: ${colors.white};
            background-color: ${colors.error};
          }
        }
      }
    }
  }
  .tags__menu {
    background-color: ${colors.primary};
    color: ${colors.white};
    z-index: 2000;
    margin-top: 3px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    box-shadow: 1px 4px 4px 0 ${colors.shadow};
    .tags__menu-list {
      padding-top: 0;
      .tags__option {
        padding: 6px 15px;
        cursor: pointer;
        &.tags__option--is-focused {
          background-color: ${colors.highlight};
        }
      }
    }
  }
`;

function TagsField({ form, field, onBlur, options, placeholder }) {
  const onChange = (options, actionType) => {
    let values = options;
    if (actionType.action === "create-option") {
      values[values.length - 1].value = createTagID(
        values[values.length - 1].value
      );
    }
    form.setFieldValue(field.name, values);
  };

  return (
    <TagsSelect
      value={field.value}
      onChange={onChange}
      onBlur={onBlur}
      isMulti={true}
      placeholder={placeholder}
      options={options}
      tabIndex="2"
    />
  );
}

export default TagsField;
