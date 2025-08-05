import React from "react";
import s from "./RecipeDescFull.module.css";
import type { RecipeDetailed } from "../../interfaces/db";

interface Props {
  recipe: RecipeDetailed;
}

const RecipeDescFull = ({ recipe }: Props) => {
  return (
    <div className={s.desc}>
      <h3>About recipe</h3>
      <p>{recipe.description}</p>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((el) => (
          <li key={el.id._id}>
            {el.id.name} — {el.measure}
          </li>
        ))}
      </ul>
      <h3>Preparation Steps:</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDescFull;
