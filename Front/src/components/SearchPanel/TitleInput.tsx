import { Field, useFormikContext } from "formik";
import React, { useEffect } from "react";
import type { FilterOptions } from "../../interfaces/requests/recipes";

interface Props {
  filterOptions: FilterOptions;
}

const TitleInput = ({ filterOptions }: Props) => {
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (!filterOptions.title) setFieldValue("title", "");
  }, [filterOptions.title]);

  return <Field type="text" name="title" placeholder="Dish's Title" />;
};

export default TitleInput;
