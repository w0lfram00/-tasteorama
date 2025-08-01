import React from "react";
import s from "./RecipesHeader.module.css";

interface Props {
  recipesCount: number;
  filtered: boolean;
}

const RecipesHeader = ({ recipesCount, filtered }: Props) => {
  return (
    <div className={s.recipesHeader}>
      <div>{recipesCount} recipes</div>
      {filtered ? (
        <div className={s.filters}>
          <button className={s.reset}>Reset filters</button>
          <input type="select" placeholder="Category" />
          <input type="select" placeholder="Ingredient" />
        </div>
      ) : undefined}
    </div>
  );
};

export default RecipesHeader;
