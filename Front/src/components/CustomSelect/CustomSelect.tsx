import { useEffect, useState } from "react";
import type { Category, Ingredient } from "../../interfaces/db";
import Arrow from "../../assets/arrow-down.svg";
import s from "./CustomSelect.module.css";
import clsx from "clsx";
import capitalize from "../../utils/capitalize";

interface Props {
  name: "category" | "ingredient";
  options: Category[] | Ingredient[];
  onChange: (value: { name: string; _id: string }) => void;
  initialValue?: string | null;
  fontsClass?: string;
  inputClass?: string;
  resetFunc?: () => void;
  clearTrigger?: boolean;
}

const CustomSelect = ({
  name,
  options,
  fontsClass,
  inputClass,
  onChange,
  resetFunc,
  clearTrigger,
  initialValue,
}: Props) => {
  const [query, setQuery] = useState<string>(initialValue || "");

  useEffect(() => {
    setQuery("");
  }, [clearTrigger]);
  useEffect(() => {
    if (initialValue) setQuery(initialValue);
  }, [initialValue]);

  return (
    <div className={clsx(s.selectContainer, fontsClass)}>
      <input
        className={inputClass}
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        autoComplete="off"
        placeholder={capitalize(name)}
        onFocus={() => {
          setQuery("");
          if (resetFunc) resetFunc();
        }}
        onBlur={() => {
          setQuery("");
          if (resetFunc) resetFunc();
        }}
      />
      <img className={s.arrow} src={Arrow} alt="arrow" />
      <ul className={s.selection}>
        {options
          .filter((option) =>
            option.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
          )
          .map((option) => (
            <li
              key={option._id}
              value={option.name}
              onMouseDown={() => {
                setTimeout(() => {
                  setQuery(option.name);
                  onChange(option);
                }, 0);
              }}
            >
              {option.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CustomSelect;
