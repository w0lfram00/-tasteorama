import { Field } from "formik";

const TitleInput = () => {
  // const { setFieldValue } = useFormikContext();
  return <Field type="text" name="title" placeholder="Dish's Title" />;
};

export default TitleInput;
