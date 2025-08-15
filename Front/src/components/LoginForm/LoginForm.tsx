import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import PasswordInput from "../PasswordInput/PasswordInput";
import loginValidation from "../../validation/loginValidation";

interface InitialValues {
  email: string;
  password: string;
}

interface Props {
  initialValues: InitialValues;
  onSubmit: (
    values: InitialValues,
    action: FormikHelpers<InitialValues>
  ) => void;
}

const LoginForm = ({ initialValues, onSubmit }: Props) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={loginValidation}
    >
      <Form>
        <label>
          Enter your email address
          <Field name="email" />
          <p className="error-message">
            <ErrorMessage name="email" />
          </p>
        </label>
        <PasswordInput name="password" label="Password" />
        <button type="submit" className="buttonGeneric">
          Log in
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
