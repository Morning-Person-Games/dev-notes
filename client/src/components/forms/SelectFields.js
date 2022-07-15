import React from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { createTagID } from "../tools/helperFunctions";
import styled from "@emotion/styled";
import { staticSizes, mixins } from "../../styles/globalStyles";

const SelectBase = styled.div`
  width: 100%;
  border-radius: ${staticSizes.radius};
  .select__control {
    :focus-visible {
      outline: none;
    }
    padding: 10px;
    cursor: text;
    background: ${(props) => props.theme.colors.primary};
    border: 0;
    color: ${(props) => props.theme.colors.white};
    width: 100%;
    background: none;
    padding: 5px 0 5px 11px;
    border-radius: 0;
    border-bottom: 0;
    min-height: 2em;
    font-size: ${staticSizes.font.lg};
    box-shadow: none;
    ${mixins.transition("background-color", 150)};
    &:hover {
      border-color: ${(props) => props.theme.colors.primary};
      background-color: ${(props) => props.theme.colors.fieldHover};
    }
    &:hover:focus-within {
      background-color: ${(props) => props.theme.colors.secondary};
    }
    .select__indicators {
      cursor: pointer;
    }
    .select__value-container {
      padding: 0 5px 0 0;

      .select__placeholder {
        white-space: nowrap;
        text-overflow: ellipsis;
        color: ${(props) => props.theme.colors.placeholder};
      }
      .select__input-container {
        :focus-visible {
          outline: none;
        }
        margin: 0 0 0 2px;
        padding: 0;
        color: ${(props) => props.theme.colors.white};
      }
      .select__multi-value {
        cursor: pointer;
        background-color: ${(props) => props.theme.colors.primary};
        color: ${(props) => props.theme.colors.white};
        .select__multi-value__label {
          color: ${(props) => props.theme.colors.white};
          padding-right: 6px;
        }
        .select__multi-value__remove {
          padding-left: 2px;
          padding-right: 2px;
          border-radius: 0 2px 2px 0;
          &:hover {
            color: ${(props) => props.theme.colors.white};
            background-color: ${(props) => props.theme.colors.error};
          }
        }
      }
      .select__single-value {
        color: ${(props) => props.theme.colors.white};
        &:disabled {
          color: ${(props) => props.theme.colors.inactiveColor};
        }
      }
    }
  }
  .select__menu {
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.white};
    z-index: 200;
    margin-top: 3px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    box-shadow: 1px 5px 4px 0 ${(props) => props.theme.colors.shadow};
    border: 1px solid ${(props) => props.theme.colors.primary};
    .select__menu-list {
      padding-top: 0;
      .select__option {
        padding: 6px 15px;
        cursor: pointer;
        ${mixins.transition()};
        &.select__option--is-focused {
          background-color: ${(props) => props.theme.colors.highlight};
        }
        &.select__option--is-disabled {
          color: ${(props) => props.theme.colors.placeholder};
          cursor: default;
        }
        &.select__option--is-focused.select__option--is-disabled {
          background-color: inherit;
        }
        &.option-heading {
          font-size: ${staticSizes.font.xs};
          color: ${(props) => props.theme.colors.inactiveColor};
          padding: 0 0 0 8px;
          font-weight: 600;
        }
      }
    }
  }
`;

function TagsField({ form, field, onBlur, options, placeholder }) {
  return (
    <SelectBase
      as={CreatableSelect}
      value={field.value}
      classNamePrefix="select"
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
  return (
    <SelectBase
      as={Select}
      isMulti={false}
      isClearable={true}
      classNamePrefix="select"
      {...props}
    />
  );
}

export { TagsField, SelectField };
