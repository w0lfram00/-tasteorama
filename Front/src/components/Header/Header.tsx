import Logo from "../Logo/Logo";
import s from "./Header.module.css";
import NavGuest from "./NavGuest";
import NavUser from "./NavUser";
import { useAppSelector } from "../../hooks/reduxForTypeScript";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/auth/selectors";
import { selectLoadingMap } from "../../redux/recipes/selectors";

const Header = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isRefreshing = useAppSelector(selectIsRefreshing);
  const { ["user/getInfo"]: isLoading } = useAppSelector(selectLoadingMap);

  return (
    <header className={s.header}>
      {!isRefreshing && !isLoading ? (
        <div className="container">
          <Logo />
          <nav>{isLoggedIn ? <NavUser /> : <NavGuest />}</nav>
        </div>
      ) : undefined}
    </header>
  );
};

export default Header;
