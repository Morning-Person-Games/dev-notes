import React from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { createTagID } from "../tools/HelperFunctions";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { theme, mixins } from "../../styles/globalStyles";

const { sizes, colors } = theme;

const SelectBase = css`
  width: 100%;
  .select__control {
    :focus-visible {
      outline: none;
    }
    padding: 10px;
    cursor: text;
    background: ${colors.primary};
    border: 0;
    color: ${colors.white};
    width: 100%;
    background: none;
    padding: 5px 0 5px 11px;
    border-radius: 0;
    border-bottom: 0;
    min-height: 2em;
    font-size: ${sizes.font.lg};
    box-shadow: none;
    ${mixins.transition("background-color", 150)};
    &:hover {
      border-color: ${colors.primary};
      background-color: ${colors.fieldHover};
    }
    &:hover:focus-within {
      background-color: ${theme.colors.secondary};
    }
    .select__indicators {
      cursor: pointer;
    }
    .select__value-container {
      padding: 0 5px 0 0;

      .select__placeholder {
        white-space: nowrap;
        text-overflow: ellipsis;
        color: ${colors.placeholder};
      }
      .select__input-container {
        :focus-visible {
          outline: none;
        }
        margin: 0 0 0 2px;
        padding: 0;
        color: ${colors.white};
      }
      .select__multi-value {
        cursor: pointer;
        background-color: ${colors.primary};
        color: ${colors.white};
        .select__multi-value__label {
          color: ${colors.white};
          padding-right: 6px;
        }
        .select__multi-value__remove {
          padding-left: 2px;
          padding-right: 2px;
          border-radius: 0 2px 2px 0;
          &:hover {
            color: ${colors.white};
            background-color: ${colors.error};
          }
        }
      }
      .select__single-value {
        color: ${colors.white};
        &:disabled {
          color: ${colors.inactiveColor};
        }
      }
    }
  }
  .select__menu {
    background-color: ${colors.secondary};
    color: ${colors.white};
    z-index: 200;
    margin-top: 3px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    box-shadow: 1px 5px 4px 0 ${colors.shadow};
    border: 1px solid ${colors.primary};
    .select__menu-list {
      padding-top: 0;
      .select__option {
        padding: 6px 15px;
        cursor: pointer;
        ${mixins.transition()};
        &.select__option--is-focused {
          background-color: ${colors.highlight};
        }
        &.select__option--is-disabled {
          color: ${colors.placeholder};
          cursor: default;
        }
        &.select__option--is-focused.select__option--is-disabled {
          background-color: inherit;
        }
        &.option-heading {
          font-size: ${sizes.font.xs};
          color: ${colors.inactiveColor};
          padding: 0 0 0 8px;
          font-weight: 500;
        }
      }
    }
  }
`;

const CreatableSelectInit = (props) => (
  <CreatableSelect classNamePrefix="select" {...props} />
);
const SelectInit = (props) => (
  <Select
    isMulti={false}
    isClearable={true}
    classNamePrefix="select"
    {...props}
  />
);

const TagsSelect = styled(CreatableSelectInit)`
  ${SelectBase};
`;

const DefaultSelect = styled(SelectInit)`
  ${SelectBase};
`;

function TagsField({ form, field, onBlur, options, placeholder }) {
  return (
    <TagsSelect
      value={field.value}
      onChange={(options, actionType) => {
        let values = options;
        if (actionType.action === "create-option") {
          values[values.length - 1].value = createTagID(
            values[values.length - 1].value
          );
        }
        form.setFieldValue(field.name, values);
      }}
      onBlur={onBlur}
      isMulti={true}
      placeholder={placeholder}
      options={options}
      tabIndex="2"
    />
  );
}

function SelectField(props) {
  return <DefaultSelect {...props} />;
}

export { TagsField, SelectField };
