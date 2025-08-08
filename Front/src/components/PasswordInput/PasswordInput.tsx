import { ErrorMessage, Field } from "formik";
import React, { useState } from "react";
import EyeOpen from "../../assets/eye-open.svg";
import EyeClosed from "../../assets/eye-closed.svg";
import s from "./PasswordInput.module.css";

interface Props {
  label: string;
  name: string;
}

const PasswordInput = ({ label, name }: Props) => {
  const [isShown, setIsShown] = useState<boolean>(false);

  const onClick = () => {
    setIsShown(!isShown);
  };

  return (
    <label className={s.inputContainer}>
      <p>{label}</p>
      <Field name={name} type={isShown ? "text" : "password"} required />
      <p className="error-message">
        <ErrorMessage name={name} />
      </p>
      <img
        src={isShown ? EyeOpen : EyeClosed}
        alt="eye-icon"
        onClick={onClick}
      />
    </label>
  );
};

export default PasswordInput;
