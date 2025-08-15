import LoginForm from "../../components/LoginForm/LoginForm";
import { NavLink } from "react-router-dom";
import s from "./LoginForm.module.css";
import type { FormikHelpers } from "formik";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxForTypeScript";
import { loginUser } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import successToast from "../../utils/toasts/successToast";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const initialValues = user?.email
    ? {
        email: user.email,
        password: "",
      }
    : {
        email: "",
        password: "",
      };

  const onSubmit = async (
    values: typeof initialValues,
    action: FormikHelpers<typeof initialValues>
  ) => {
    await dispatch(loginUser(values));
    successToast("Logged in successfully!");

    action.resetForm();
  };

  return (
    <div className={s.login}>
      <h2>Login</h2>
      <LoginForm initialValues={initialValues} onSubmit={onSubmit} />
      <p className={s.registerLink}>
        Don't have an account? <NavLink to="/register">Register</NavLink>
      </p>
    </div>
  );
};

export default LoginPage;
