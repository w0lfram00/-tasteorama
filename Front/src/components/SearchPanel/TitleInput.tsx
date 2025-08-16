import { Field, type FieldProps } from "formik";
import updateSearchParams from "../../utils/updateSearchParams";

const TitleInput = () => {
  return (
    <Field name="title">
      {({ field }: FieldProps) => (
        <input
          type="text"
          placeholder="Dish's Title"
          {...field}
          onBlur={(e) => {
            field.onBlur(e);
            updateSearchParams("title", field.value);
          }}
        />
      )}
    </Field>
  );
};

export default TitleInput;
