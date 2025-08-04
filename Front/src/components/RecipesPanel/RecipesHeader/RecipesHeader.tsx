import React from "react";
import s from "./RecipesHeader.module.css";
import RecipesFilters from "./RecipesFilters";

interface Props {
  recipesCount: number;
  filtered: boolean;
}

const RecipesHeader = ({ recipesCount, filtered }: Props) => {
  return (
    <div className={s.recipesHeader}>
      <div>{recipesCount} recipes</div>
      {filtered ? <RecipesFilters /> : undefined}
    </div>
  );
};

export default RecipesHeader;
