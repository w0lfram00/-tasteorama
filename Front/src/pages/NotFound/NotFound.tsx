import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";
import s from "./NotFound.module.css";
import Img from "../../assets/404.jpg";

const NotFound = () => {
  return (
    <div className={clsx("container", s.notFound)}>
      <img src={Img} alt="Dirty dish" />
      <div className={s.text}>
        <h2>404</h2>
        <p>Recipe not found</p>
      </div>
      <NavLink className="buttonGeneric" to="/">
        Back to Home
      </NavLink>
    </div>
  );
};

export default NotFound;
