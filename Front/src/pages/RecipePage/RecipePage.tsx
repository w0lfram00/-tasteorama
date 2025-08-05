import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxForTypeScript";
import { selectSelectedRecipe } from "../../redux/recipes/selectors";
import { Navigate, redirect, useParams } from "react-router-dom";
import { getRecipeById } from "../../redux/recipes/operations";
import s from "./RecipePage.module.css";
import SaveButton from "../../components/SaveButton/SaveButton";
import RecipeDescFull from "../../components/RecipeDescFull/RecipeDescFull";

const RecipePage = () => {
  const dispatch = useAppDispatch();
  const recipe = useAppSelector(selectSelectedRecipe);
  const { recipeId } = useParams();

  useEffect(() => {
    if (recipeId) dispatch(getRecipeById(recipeId));
    else redirect("/recipe/not-found");
  }, [recipeId, dispatch]);

  return recipe ? (
    <div>
      <h2>{recipe.title}</h2>
      <div>
        <img
          src={recipe.img || recipe.thumb}
          alt={`image of ${recipe.title}`}
        />
      </div>
      <div className={s.content}>
        <RecipeDescFull recipe={recipe} />
        <div className={s.interaction}>
          <div className={s.shortInfo}></div>
          <SaveButton />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/not-found" />
  );
};

export default RecipePage;
