import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxForTypeScript";
import { selectCategories } from "../../redux/categories/selectors";
import { selectIngredients } from "../../redux/ingredients/selectors";
import { getCategories } from "../../redux/categories/operations";
import { getIngredients } from "../../redux/ingredients/operations";
import { Field, Form, Formik } from "formik";
import s from "./CreateRecipeForm.module.css";
import CustomSelectField from "../CustomSelect/CustomSelectField";

const CreateRecipeForm = () => {
  const categories = useAppSelector(selectCategories);
  const Ingredients = useAppSelector(selectIngredients);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIngredients());
  }, []);

  const initialValues = {
    title: "",
  };

  const onSubmit = () => {};

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className={s.recipeForm}>
        <div className={s.generalHalf}>
          <h3>General Information</h3>
          <label>
            Recipe title
            <Field name="title" />
          </label>
          <label>
            Recipe description
            <Field name="description" type="textarea" />
          </label>
          <label>
            Cooking time in minutes
            <Field name="time" />
          </label>
          <label>
            Category
            <CustomSelectField
              className={s.category}
              name="category"
              options={categories}
            />
          </label>
          <h3>Ingredients</h3>
          <div></div>
          <h3>Instructions</h3>
          <Field name="instruction" type="textarea" />
        </div>
        <div className={s.photoHalf}>
          <h3>Upload Photo</h3>
          <div className={s.photoContainer}></div>
        </div>
      </Form>
    </Formik>
  );
};

export default CreateRecipeForm;
