import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import PasswordInput from "../PasswordInput/PasswordInput";
import registerValidation from "../../validation/registerValidation";

interface InitialValues {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

interface Props {
  initialValues: InitialValues;
  onSubmit: (
    values: InitialValues,
    action: FormikHelpers<InitialValues>
  ) => void;
}

const RegisterForm = ({ initialValues, onSubmit }: Props) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={registerValidation}
    >
      <Form>
        <label>
          <p>Enter your name</p>
          <Field name="name" placeholder="Your name" required />
          <p className="error-message">
            <ErrorMessage name="name" />
          </p>
        </label>
        <label>
          <p>Enter your email address</p>
          <Field
            name="email"
            type="email"
            placeholder="example@mail.com"
            required
          />
          <p className="error-message">
            <ErrorMessage name="email" />
          </p>
        </label>
        <PasswordInput name="password" label="Create a strong password" />
        <PasswordInput name="passwordRepeat" label="Repeat your password" />
        <button type="submit" className="buttonGeneric">
          Create account
        </button>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
