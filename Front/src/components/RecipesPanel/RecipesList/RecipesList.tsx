import React from "react";
import type { Recipe } from "../../../interfaces/db";
import RecipeItem from "./RecipeItem";

interface Props {
  recipes: Array<Recipe>;
}

const RecipesList = ({ recipes }: Props) => {
  return recipes.length ? (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe._id}>
          <RecipeItem recipe={recipe} />
        </li>
      ))}
    </ul>
  ) : (
    <p>No recipes found :(</p>
  );
};

export default RecipesList;
