import React, { useState } from "react";
import Logo from "../Logo/Logo";
import s from "./Header.module.css";
import NavGuest from "./NavGuest";
import NavUser from "./NavUser";

const Header = () => {
  const [isLoggedIn] = useState<boolean>(false);

  return (
    <header className={s.header}>
      <div className="container">
        <Logo />
        <nav>{!isLoggedIn ? <NavUser /> : <NavGuest />}</nav>
      </div>
    </header>
  );
};

export default Header;
