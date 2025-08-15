import s from "./Logo.module.css";
import SiteLogo from "../../assets/logo.svg";

const Logo = () => {
  return (
    <div className={s.logo}>
      <img src={SiteLogo} alt="logo" />
      <span>Tasteorama</span>
    </div>
  );
};

export default Logo;
