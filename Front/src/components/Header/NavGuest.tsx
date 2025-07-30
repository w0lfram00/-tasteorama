import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

const NavGuest = () => {
  return (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? s.activeLink : s.inactiveLink)}
      >
        Recipes
      </NavLink>
      <div className={s.auth}>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? s.activeLink : s.inactiveLink
          }
        >
          Login
        </NavLink>
        <NavLink className={s.button} to="/register">
          Register
        </NavLink>
      </div>
    </>
  );
};

export default NavGuest;
