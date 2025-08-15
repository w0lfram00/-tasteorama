import React from "react";
import s from "./Loader.module.css";
import { RiseLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className={s.loader}>
      <RiseLoader color="#9b6c43" />
    </div>
  );
};

export default Loader;
