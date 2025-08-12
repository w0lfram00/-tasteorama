import React from "react";
import Logout from "../../../assets/logout.svg";
import s from "./UserMenu.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/reduxForTypeScript";
import { logoutUser } from "../../../redux/auth/operations";
import { selectUser } from "../../../redux/auth/selectors";

const UserMenu = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <div className={s.userMenu}>
      <div className={s.account}>
        <span>{user?.name.slice(0, 1).toUpperCase()}</span>
        <p>{user?.name}</p>
      </div>
      <button
        onClick={() => {
          dispatch(logoutUser());
        }}
      >
        <img src={Logout} alt="logout icon" />
      </button>
    </div>
  );
};

export default UserMenu;
