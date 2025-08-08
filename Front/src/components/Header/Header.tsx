import React from "react";
import Logo from "../Logo/Logo";
import s from "./Header.module.css";
import NavGuest from "./NavGuest";
import NavUser from "./NavUser";
import { useAppSelector } from "../../hooks/reduxForTypeScript";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/auth/selectors";

const Header = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isRefreshing = useAppSelector(selectIsRefreshing);

  return !isRefreshing ? (
    <header className={s.header}>
      <div className="container">
        <Logo />
        <nav>{isLoggedIn ? <NavUser /> : <NavGuest />}</nav>
      </div>
    </header>
  ) : undefined;
};

export default Header;
