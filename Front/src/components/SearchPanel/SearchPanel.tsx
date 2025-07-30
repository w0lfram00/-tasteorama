import { Field, Form, Formik } from "formik";
import React from "react";
import s from "./SearchPanel.module.css";

interface Props {
  onSubmit: () => void;
}

const SearchPanel = ({ onSubmit }: Props) => {
  const initialValues = {
    title: "",
  };

  return (
    <div className={s.searchPanel}>
      <div className="container">
        <h1>Plan, Cook, and Share Your Flavor</h1>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
