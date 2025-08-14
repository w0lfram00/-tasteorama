import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxForTypeScript";
import { selectCategories } from "../../redux/categories/selectors";
import { selectIngredients } from "../../redux/ingredients/selectors";
import { getCategories } from "../../redux/categories/operations";
import { getIngredients } from "../../redux/ingredients/operations";
import { Field, Form, Formik } from "formik";
import s from "./CreateRecipeForm.module.css";
import CustomSelectField from "../CustomSelect/CustomSelectField";
import IngredientsAdder from "../IngredientsAdder/IngredientsAdder";
import Photo from "../../assets/photo.svg";
import type { Ingredient } from "../../interfaces/db";
import { postRecipe } from "../../redux/recipes/operations";

const CreateRecipeForm = () => {
  const categories = useAppSelector(selectCategories);
  const ingredients = useAppSelector(selectIngredients);
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [addedIngredients, setAddedIngr] = useState<
    { id: Ingredient; measure: string }[]
  >([]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIngredients());
  }, []);

  const initialValues = {
    title: "",
    description: "",
    time: 0,
    instructions: "",
    category: "",
  };

  const onSubmit = (values: typeof initialValues) => {
    const formdata = new FormData();
    formdata.append("title", values.title);
    formdata.append("category", values.category);
    formdata.append("instructions", values.instructions);
    formdata.append("description", values.description);
    formdata.append("time", values.time.toString());
    if (fileInputRef.current)
      formdata.append("thumb", fileInputRef.current?.value);
    formdata.append("ingredients", JSON.stringify(addedIngredients));
    dispatch(postRecipe(formdata));
  };

  const addIngredient = (ingredient: { id: Ingredient; measure: string }) =>
    setAddedIngr((prev) => [...prev, ingredient]);
  const removeIngredient = (id: string) =>
    setAddedIngr((prev) => prev.filter((ingr) => ingr.id._id != id));

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className={s.recipeForm}>
        <div className={s.generalHalf}>
          <div className={s.fields}>
            <h3>General Information</h3>
            <label className={s.field}>
              Recipe title
              <Field name="title" placeholder="Enter the name of your recipe" />
            </label>
            <label className={s.field}>
              Recipe description
              <Field
                name="description"
                as="textarea"
                placeholder="Enter a brief description of your recipe"
              />
            </label>
            <label className={s.field}>
              Cooking time in minutes
              <Field name="time" type="number" min="0" />
            </label>
            <label className={s.field}>
              Category
              <CustomSelectField
                fontsClass={s.categoryFonts}
                inputClass={s.categoryInput}
                name="category"
                options={categories}
              />
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
          </div>
          <div className={s.field}>
            <h3>Instructions</h3>
            <Field name="instructions" as="textarea" expandable="false" />
          </div>
          <button className="buttonGeneric" type="submit">
            Publish Recipe
          </button>
        </div>
        <div className={s.photoHalf}>
          <h3>Upload Photo</h3>
          <div
            className={s.photoContainer}
            onClick={() => fileInputRef.current?.click()}
          >
            <input type="file" ref={fileInputRef} />
            <img src={Photo} alt="photo placeholder" />
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default CreateRecipeForm;
