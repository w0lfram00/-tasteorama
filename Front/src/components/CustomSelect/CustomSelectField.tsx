import React from "react";
import type { Category, Ingredient } from "../../interfaces/db";
import Arrow from "../../assets/arrow-down.svg";
import s from "./CustomSelect.module.css";
import clsx from "clsx";
import capitalize from "../../utils/capitalize";
import { Field, useFormikContext } from "formik";

interface Props {
  name: "category" | "ingredient";
  inputValue?: string | undefined;
  options: Category[] | Ingredient[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fontsClass?: string;
  inputClass: string;
}

interface Context {
  category: string;
  ingredient: string;
}

const CustomSelectField = ({
  name,
  options,
  fontsClass,
  inputClass,
}: Props) => {
  const { values } = useFormikContext<Context>();
  if (!values[name]) values[name] = "";

  return (
    <div className={clsx(s.selectContainer, fontsClass)}>
      <Field
        type="text"
        name={name}
        autoComplete="off"
        placeholder={capitalize(name)}
        className={inputClass}
      />
      <img className={s.arrow} src={Arrow} alt="arrow" />
      <ul className={s.selection}>
        {options
          .filter((option) =>
            option.name.toLocaleLowerCase().includes(values[name])
          )
          .map((option) => (
            <li
              key={option._id}
              value={option.name}
              onMouseDown={() => {
                values[name] = option.name;
              }}
            >
              {option.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CustomSelectField;
