import { NavLink, Outlet, useNavigate } from "react-router-dom";
import s from "./ProfilePage.module.css";
import clsx from "clsx";
import { useEffect } from "react";

const ProfilePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/profile/own");
  }, []);

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
