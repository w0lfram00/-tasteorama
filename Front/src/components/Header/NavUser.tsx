import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import UserMenu from "./UserMenu/UserMenu";

const NavUser = () => {
  return (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? s.activeLink : s.inactiveLink)}
      >
        Recipes
      </NavLink>
      <NavLink
        to={`/profile/own`}
        className={({ isActive }) => (isActive ? s.activeLink : s.inactiveLink)}
      >
        My Profile
      </NavLink>
      <NavLink className={s.button} to="/add-recipe">
        Add Recipe
      </NavLink>
      <UserMenu />
    </>
  );
};

export default NavUser;
