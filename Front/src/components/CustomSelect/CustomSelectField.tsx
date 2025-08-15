import { useState } from "react";
import type { Category, Ingredient } from "../../interfaces/db";
import Arrow from "../../assets/arrow-down.svg";
import s from "./CustomSelect.module.css";
import clsx from "clsx";
import capitalize from "../../utils/capitalize";
import { Field, useFormikContext, type FieldProps } from "formik";

interface Props {
  name: "category" | "ingredient";
  options: Category[] | Ingredient[];
  onChange?: (value: { _id: string; name: string }) => void;
  fontsClass?: string;
  inputClass?: string;
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
  onChange,
}: Props) => {
  const [modified, setModified] = useState<boolean>(false);
  const { values } = useFormikContext<Context>();
  if (!values[name]) values[name] = "";

  return (
    <div className={clsx(s.selectContainer, fontsClass)}>
      <Field name={name}>
        {({ field, form }: FieldProps) => (
          <input
            className={inputClass}
            type="text"
            onChange={field.onChange}
            value={field.value}
            autoComplete="off"
            placeholder={capitalize(name)}
            name={field.name}
            onFocus={() => {
              form.setFieldValue(field.name, "");
              setModified(false);
            }}
            onBlur={(e) => {
              if (!modified) {
                console.log(values[name]);
                form.setFieldValue(field.name, "");
              }
              field.onBlur(e);
            }}
          />
        )}
      </Field>
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
                setModified(true);
                if (onChange) onChange(option);
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
