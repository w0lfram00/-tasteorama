import { Field, Form, Formik } from "formik";
import React from "react";
import s from "./SearchPanel.module.css";
import type { FilterOptions } from "../../interfaces/requests/recipes";
import { useAppSelector } from "../../hooks/reduxForTypeScript";
import { selectFilterOptions } from "../../redux/recipes/selectors";

interface Props {
  onSubmit: (filterOptions: FilterOptions) => void;
}

const SearchPanel = ({ onSubmit }: Props) => {
  const otherFilterOptions = useAppSelector(selectFilterOptions);

  const initialValues = {
    title: "",
  };

  return (
    <div className={s.searchPanel}>
      <div className="container">
        <h1>Plan, Cook, and Share Your Flavor</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            onSubmit({ ...otherFilterOptions, ...values });
          }}
        >
          <Form>
            <Field type="text" name="title" />
            <button type="submit">Search</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SearchPanel;
