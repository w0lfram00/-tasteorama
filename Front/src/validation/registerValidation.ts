import * as Yup from "yup";

const registerValidation = Yup.object({
  name: Yup.string()
    .min(4, "Too short name")
    .max(16, "Too long name")
    .required(),
  email: Yup.string()
    .email("Must be a valid email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Must be a valid email"
    )
    .max(128, "Too long")
    .required(),
  password: Yup.string().min(8).max(128).required(),
});

export default registerValidation;
