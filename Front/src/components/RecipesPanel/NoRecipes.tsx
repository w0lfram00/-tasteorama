import React from "react";
import { useAppDispatch } from "../../hooks/reduxForTypeScript";
import s from "./RecipesPanel.module.css";
import { resetFilters } from "../../redux/recipes/slice";
import { useFormikContext } from "formik";

const NoRecipes = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={s.notFound}>
      <h3>We're sorry! We were not able to find a match.</h3>
      <button
        onClick={() => {
          dispatch(resetFilters());
        }}
      >
        Reset search and filters
      </button>
    </div>
  );
};

export default NoRecipes;
