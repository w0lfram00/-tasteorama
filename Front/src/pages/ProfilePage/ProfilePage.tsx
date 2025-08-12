import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import s from "./ProfilePage.module.css";
import clsx from "clsx";

const ProfilePage = () => {
  return (
    <div className={clsx("container", s.profile)}>
      <h2>My profile</h2>
      <div className={s.navLinks}>
        <NavLink
          className={({ isActive }) => isActive && s.activeLink}
          to="own"
        >
          My recipes
        </NavLink>
        <NavLink
          className={({ isActive }) => isActive && s.activeLink}
          to="saved"
        >
          Saved recipes
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default ProfilePage;
