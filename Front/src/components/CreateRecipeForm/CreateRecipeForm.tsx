import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxForTypeScript";
import { selectCategories } from "../../redux/categories/selectors";
import { selectIngredients } from "../../redux/ingredients/selectors";
import { getCategories } from "../../redux/categories/operations";
import { getIngredients } from "../../redux/ingredients/operations";
import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./CreateRecipeForm.module.css";
import CustomSelectField from "../CustomSelect/CustomSelectField";
import IngredientsAdder from "../IngredientsAdder/IngredientsAdder";
import Photo from "../../assets/photo.svg";
import type { Ingredient } from "../../interfaces/db";
import { postRecipe } from "../../redux/recipes/operations";
import createRecipeValidation from "../../validation/createRecipeValidation";
import { useNavigate } from "react-router-dom";
import { selectIsLoading } from "../../redux/recipes/selectors";
import successToast from "../../utils/toasts/successToast";
import errorToast from "../../utils/toasts/errorToast";

const CreateRecipeForm = () => {
  const navigate = useNavigate();
  const categories = useAppSelector(selectCategories);
  const ingredients = useAppSelector(selectIngredients);
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<Blob>();
  const [addedIngredients, setAddedIngr] = useState<
    { id: Ingredient; measure: string }[]
  >([]);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIngredients());
  }, []);

  const initialValues = {
    title: "",
    description: "",
    time: null,
    instructions: "",
    category: "",
  };

  const onSubmit = async (values: any) => {
    if (!file) {
      errorToast("Please, provide image of completed meal");
      return;
    }
    if (!addedIngredients.length) {
      errorToast("Please, add ingredients needed");
      return;
    }

    const formdata = new FormData();
    formdata.append("title", values.title);
    formdata.append("category", values.category);
    formdata.append("instructions", values.instructions);
    formdata.append("description", values.description);
    formdata.append("time", values.time.toString());
    formdata.append("thumb", file);
    formdata.append("ingredients", JSON.stringify(addedIngredients));
    const recipe = await dispatch(postRecipe(formdata)).unwrap();
    if (recipe) successToast("Created recipe successfully!");
    navigate("/recipes/" + recipe._id);
  };

  const addIngredient = (ingredient: { id: Ingredient; measure: string }) =>
    setAddedIngr((prev) => [...prev, ingredient]);
  const removeIngredient = (id: string) =>
    setAddedIngr((prev) => prev.filter((ingr) => ingr.id._id != id));

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={createRecipeValidation}
    >
      <Form className={s.recipeForm}>
        <div className={s.generalHalf}>
          <div className={s.fields}>
            <h3>General Information</h3>
            <label className={s.field}>
              Recipe title
              <Field name="title" placeholder="Enter the name of your recipe" />
              <p className="error-message">
                <ErrorMessage name="title" />
              </p>
            </label>
            <label className={s.field}>
              Recipe description
              <Field
                name="description"
                as="textarea"
                placeholder="Enter a brief description of your recipe"
              />
              <p className="error-message">
                <ErrorMessage name="description" />
              </p>
            </label>
            <label className={s.field}>
              Cooking time in minutes
              <Field name="time" type="number" min="0" />
              <p className="error-message">
                <ErrorMessage name="time" />
              </p>
            </label>
            <label className={s.field}>
              Category
              <CustomSelectField
                fontsClass={s.categoryFonts}
                inputClass={s.categoryInput}
                name="category"
                options={categories}
              />
              <p className="error-message">
                <ErrorMessage name="category" />
              </p>
            </label>
          </div>
          <div className={s.field}>
            <h3>Ingredients</h3>
            <IngredientsAdder
              ingredients={ingredients}
              addedIngredients={addedIngredients}
              addIngrFunc={addIngredient}
              removeFunc={removeIngredient}
            />
            <p className="error-message">
              <ErrorMessage name="ingredients" />
            </p>
          </div>
          <div className={s.field}>
            <h3>Instructions</h3>
            <Field name="instructions" as="textarea" expandable="false" />
            <p className="error-message">
              <ErrorMessage name="instructions" />
            </p>
          </div>
          <button className="buttonGeneric" type="submit" disabled={isLoading}>
            Publish Recipe
          </button>
        </div>
        <div className={s.photoHalf}>
          <h3>Upload Photo</h3>
          <div
            className={s.photoContainer}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files) setFile(e.target.files[0]);
              }}
            />
            <img
              src={file ? URL.createObjectURL(file) : Photo}
              alt="photo placeholder"
            />
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default CreateRecipeForm;
