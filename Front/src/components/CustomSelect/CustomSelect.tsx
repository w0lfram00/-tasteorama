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
  initialValue?: { value: string | undefined } | null;
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
  const [query, setQuery] = useState<{ value: string }>({
    value: initialValue?.value || "",
  });

  useEffect(() => {
    setQuery({ value: "" });
  }, [clearTrigger]);
  useEffect(() => {
    setQuery({ value: initialValue?.value || "" });
  }, [initialValue]);

  return (
    <div className={clsx(s.selectContainer, fontsClass)}>
      <input
        className={inputClass}
        type="text"
        onChange={(e) => setQuery({ value: e.target.value })}
        value={query.value}
        autoComplete="off"
        placeholder={capitalize(name)}
        onFocus={() => {
          setQuery({ value: "" });
          if (resetFunc) resetFunc();
        }}
        onBlur={() => {
          setQuery({ value: "" });
          if (resetFunc) resetFunc();
        }}
      />
      <img className={s.arrow} src={Arrow} alt="arrow" />
      <ul className={s.selection}>
        {options
          .filter((option) =>
            option.name
              .toLocaleLowerCase()
              .includes(query.value.toLocaleLowerCase())
          )
          .map((option) => (
            <li
              key={option._id}
              value={option.name}
              onMouseDown={() => {
                setTimeout(() => {
                  setQuery({ value: option.name });
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
