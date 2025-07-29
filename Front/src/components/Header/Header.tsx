import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import s from "./Header.module.css";

const Header = () => {
  return (
    <header className={s.header}>
      <div className="container">
        <Logo />
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? s.activeLink : s.inactiveLink
            }
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
            <NavLink to="/register">
              <button>Register</button>
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
