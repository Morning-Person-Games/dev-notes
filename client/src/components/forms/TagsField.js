import React from "react";
import CreatableSelect from "react-select/creatable";
import { createTagID } from "../tools/HelperFunctions";

function TagsField({ form, field, onBlur, options, placeholder }) {
  const onChange = (options, actionType) => {
    let values = options;
    if (actionType.action === "create-option") {
      values[values.length - 1].value = createTagID(
        values[values.length - 1].value
      );
    }
    // console.log(values);
    form.setFieldValue(field.name, values);
  };

  // const getValue = () => {
  //   if (options && field.value) {
  //     return options.filter((option) => field.value.indexOf(option.value) >= 0);
  //   } else {
  //     return [];
  //   }
  // };

  return (
    <CreatableSelect
      value={field.value}
      onChange={onChange}
      onBlur={onBlur}
      isMulti={true}
      placeholder={placeholder}
      options={options}
      multi
    />
  );
}

export default TagsField;
