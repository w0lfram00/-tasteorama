import React, { useEffect } from "react";
import RecipesHeader from "./RecipesHeader/RecipesHeader";
import RecipesList from "./RecipesList/RecipesList";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxForTypeScript";
import {
  selectFilterOptions,
  selectPaginationInfo,
  selectRecipes,
} from "../../redux/recipes/selectors";
import { getAllRecipes } from "../../redux/recipes/operations";

interface Props {
  title: string;
  filtered: boolean;
}

const RecipesPanel = ({ title, filtered }: Props) => {
  const recipes = useAppSelector(selectRecipes);
  const filterOptions = useAppSelector(selectFilterOptions);
  const paginationInfo = useAppSelector(selectPaginationInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllRecipes({}));
  }, [filterOptions, dispatch]);

  return (
    <div className="container">
      {title ? <h2>{title}</h2> : undefined}
      <RecipesHeader
        recipesCount={paginationInfo.totalItems}
        filtered={filtered}
      />
      <RecipesList recipes={recipes} />
    </div>
  );
};

export default RecipesPanel;
