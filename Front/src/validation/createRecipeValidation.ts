import * as Yup from "yup";

const createRecipeValidation = Yup.object({
  title: Yup.string().min(3).max(40).required(),
  category: Yup.string().min(3).max(20).required(),
  instructions: Yup.string()
    .min(100, "Write it more detailed")
    .max(1200)
    .required(),
  description: Yup.string()
    .min(50, "Write some more info")
    .max(1000)
    .required(),
  time: Yup.number()
    .min(3, "Time's too short")
    .max(999, "Time's too big")
    .required(),
});

export default createRecipeValidation;
