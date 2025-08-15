import Logo from "../Logo/Logo";
import { NavLink } from "react-router-dom";
import s from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className="container">
        <Logo />
        <p>© 2025 CookingCompanion. All rights reserved.</p>
        <nav>
          <NavLink to="/">Recipes</NavLink>
          <NavLink to="/profile/own">Account</NavLink>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
