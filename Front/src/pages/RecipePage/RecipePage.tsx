import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxForTypeScript";
import {
  selectError,
  selectIsLoading,
  selectSelectedRecipe,
} from "../../redux/recipes/selectors";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipeById } from "../../redux/recipes/operations";
import s from "./RecipePage.module.css";
import RecipeDescFull from "../../components/RecipeDescFull/RecipeDescFull";
import Loader from "../../components/Loader/Loader";
import { resetError } from "../../redux/recipes/slice";
import RecipeGeneralInfo from "../../components/RecipeGeneralInfo/RecipeGeneralInfo";

const RecipePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const recipe = useAppSelector(selectSelectedRecipe);
  const error = useAppSelector(selectError);
  const isLoading = useAppSelector(selectIsLoading);
  const { recipeId } = useParams();

  useEffect(() => {
    if (recipeId) dispatch(getRecipeById(recipeId));
    else navigate("/not-found");
  }, [recipeId, dispatch]);

  useEffect(() => {
    if (error?.status == 400) navigate("/not-round");
    return () => {
      if (error) dispatch(resetError());
    };
  }, [error, dispatch]);

  return isLoading ? (
    <Loader />
  ) : recipe ? (
    <div className="container">
      <div className={s.recipe}>
        <h2>{recipe.title}</h2>
        <div className={s.imgContainer}>
          <img
            src={recipe.img || recipe.thumb}
            alt={`image of ${recipe.title}`}
          />
        </div>
        <div className={s.content}>
          <RecipeDescFull recipe={recipe} />
          <RecipeGeneralInfo recipe={recipe} />
        </div>
      </div>
    </div>
  ) : undefined;
};

export default RecipePage;
