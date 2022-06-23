import React from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { createTagID } from "../tools/HelperFunctions";

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

  //! probably have to put tags under the select field since the form can sit in 320px occasionally

  return (
    <CreatableSelect
      value={field.value}
      onChange={onChange}
      onBlur={onBlur}
      isMulti={true}
      placeholder={placeholder}
      options={options}
    />
  );
}

function CategoriesField({ form, field, onBlur, categories, placeholder }) {
  const onChange = (values) => {
    form.setFieldValue(field.name, values);
  };
  if (categories.length <= 0) {
    return (
      <Select
        onBlur={onBlur}
        isDisabled={true}
        isSearchable={false}
        placeholder="Loading categories..."
      />
    );
  }
  return (
    <Select
      value={field.value}
      onChange={onChange}
      onBlur={onBlur}
      defaultValue={categories[0].value}
      isSearchable={false}
      placeholder={placeholder}
      options={categories}
    />
  );
}

export { TagsField, CategoriesField };
