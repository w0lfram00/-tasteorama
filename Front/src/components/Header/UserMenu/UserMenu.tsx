import React from "react";
import Logout from "../../../assets/logout.svg";
import s from "./UserMenu.module.css";

const UserMenu = () => {
  return (
    <div className={s.userMenu}>
      <div className={s.account}>
        <span>M</span>
        <p>Maximus</p>
      </div>
      <button>
        <img src={Logout} alt="logout icon" />
      </button>
    </div>
  );
};

export default UserMenu;
