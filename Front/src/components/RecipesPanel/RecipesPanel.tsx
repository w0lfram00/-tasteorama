import React, { useEffect } from "react";
import RecipesHeader from "./RecipesHeader/RecipesHeader";
import RecipesList from "./RecipesList/RecipesList";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxForTypeScript";
import {
  selectFilterOptions,
  selectPage,
  selectPaginationInfo,
  selectRecipes,
} from "../../redux/recipes/selectors";
import { getAllRecipes } from "../../redux/recipes/operations";
import s from "./RecipesPanel.module.css";
import { nextPage } from "../../redux/recipes/slice";

interface Props {
  title: string;
  filtered: boolean;
}

const RecipesPanel = ({ title, filtered }: Props) => {
  const recipes = useAppSelector(selectRecipes);
  const filterOptions = useAppSelector(selectFilterOptions);
  const paginationInfo = useAppSelector(selectPaginationInfo);
  const page = useAppSelector(selectPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllRecipes({ perPage: 32, page }));
  }, [filterOptions, page, dispatch]);

  return (
    <div className="container">
      {title ? <h2 className={s.title}>{title}</h2> : undefined}
      <RecipesHeader
        recipesCount={paginationInfo.totalItems}
        filtered={filtered}
      />
      <RecipesList recipes={recipes} />
    </div>
  );
};

export default RecipesPanel;
