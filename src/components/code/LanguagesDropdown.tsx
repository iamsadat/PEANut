import React from "react";
import Select from "react-select";
import { languageOptions } from "@/lib/languageOptions";
import { customStyles } from "@/lib/customStyles";

const LanguagesDropdown = ({ onSelectChange }) => {
  return (
    <Select
      placeholder={`Filter By Category`}
      options={languageOptions}
      styles={customStyles}
      defaultValue={languageOptions[5]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
};

export default LanguagesDropdown;
