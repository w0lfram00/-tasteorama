import { Field, useFormikContext, type FieldProps } from "formik";
import updateSearchParams from "../../utils/updateSearchParams";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

interface Props {
  value: string;
}

const TitleInput = ({ value }: Props) => {
  const location = useLocation();
  const form = useFormikContext();

  useEffect(() => {
    form.setFieldValue("title", value);
  }, [location]);

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
