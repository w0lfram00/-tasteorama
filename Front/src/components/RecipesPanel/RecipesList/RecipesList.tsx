import React from "react";
import type { Recipe } from "../../../interfaces/db";
import RecipeItem from "./RecipeItem";
import s from "./RecipesList.module.css";
import { useAppDispatch } from "../../../hooks/reduxForTypeScript";
import { nextPage, resetFilters } from "../../../redux/recipes/slice";

interface Props {
  recipes: Array<Recipe>;
}

const RecipesList = ({ recipes }: Props) => {
  const dispatch = useAppDispatch();

  return recipes.length ? (
    <div>
      <ul className={s.recipeList}>
        {recipes.map((recipe) => (
          <li className={s.recipeCard} key={recipe._id}>
            <RecipeItem recipe={recipe} />
          </li>
        ))}
      </ul>
      <button
        className={s.loadMore}
        onClick={() => {
          dispatch(nextPage());
        }}
      >
        Load More
      </button>
    </div>
  ) : (
    <div className={s.notFound}>
      <h3>We’re sorry! We were not able to find a match.</h3>
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

export default RecipesList;
