import React from "react";
import type { Category, Ingredient } from "../../interfaces/db";

interface Props {
  name: "category" | "ingredient";
  inputValue: string | undefined;
  options: Category[] | Ingredient[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CustomSelect = ({ name, options, inputValue, onChange }: Props) => {
  return (
    <select
      name={name}
      value={inputValue ? inputValue : ""}
      onChange={(e) => onChange(e)}
    >
      {options.map((option) => (
        <option key={option._id} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
