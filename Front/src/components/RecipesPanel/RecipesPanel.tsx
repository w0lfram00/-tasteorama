import React from "react";
import RecipesHeader from "./RecipesHeader/RecipesHeader";
import RecipesList from "./RecipesList/RecipesList";
import s from "./RecipesPanel.module.css";
import type { Recipe } from "../../interfaces/db";
import type { PaginationInfo } from "../../interfaces/requests/recipes";
import NoRecipes from "./NoRecipes";
import { useAppSelector } from "../../hooks/reduxForTypeScript";
import { selectIsLoading } from "../../redux/recipes/selectors";
import Loader from "../Loader/Loader";

interface Props {
  title: string;
  filtered: boolean;
  recipes: Recipe[];
  paginationInfo: PaginationInfo;
}

const RecipesPanel = ({ title, filtered, recipes, paginationInfo }: Props) => {
  const isLoading = useAppSelector(selectIsLoading);

  return (
    <div className="container">
      {title ? <h2 className={s.title}>{title}</h2> : undefined}
      <RecipesHeader
        recipesCount={paginationInfo.totalItems}
        filtered={filtered}
      />
      {recipes.length ? (
        <RecipesList recipes={recipes} paginationInfo={paginationInfo} />
      ) : !isLoading ? (
        <NoRecipes />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default RecipesPanel;
