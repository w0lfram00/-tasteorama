import React from "react";
import s from "./ScreenLoader.module.css";
import { PuffLoader } from "react-spinners";

const ScreenLoader = () => {
  return (
    <div className={s.wrapper}>
      <PuffLoader size={300} color="#d9aa1eff" />
    </div>
  );
};

export default ScreenLoader;
