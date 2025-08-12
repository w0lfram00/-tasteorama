import { type FormikHelpers } from "formik";
import React from "react";
import s from "./RegisterPage.module.css";
import { useAppDispatch } from "../../hooks/reduxForTypeScript";
import { registerUser } from "../../redux/auth/operations";
import { NavLink, useNavigate } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  };

  const onSubmit = async (
    values: typeof initialValues,
    action: FormikHelpers<typeof initialValues>
  ) => {
    if (values.password !== values.passwordRepeat) {
      action.setErrors({ passwordRepeat: "Passwords must be identical" });
      return;
    }

    delete (values as any).passwordRepeat;

    await dispatch(registerUser(values)).unwrap();
    action.resetForm();
    navigate("/login");
  };

  return (
    <div className={s.register}>
      <h2>Register</h2>
      <p className={s.message}>
        Join our community of culinary enthusiasts, save your favorite recipes,
        and share your cooking creations
      </p>
      <RegisterForm initialValues={initialValues} onSubmit={onSubmit} />
      <p className={s.loginLink}>
        Already have an account? <NavLink to="/login">Log in</NavLink>
      </p>
    </div>
  );
};

export default RegisterPage;
