import React from "react";
import type { Recipe } from "../../../interfaces/db";
import { NavLink } from "react-router-dom";

interface Props {
  recipe: Recipe;
}

const RecipeItem = ({ recipe }: Props) => {
  return (
    <>
      <img
        src={recipe.img ? recipe.img : recipe.thumb}
        alt="Picture of prepared dish"
      />
      <div>
        <div>
          <h3>{recipe.title}</h3>
          <div>
            <img src="" alt="" /> {recipe.time}
          </div>
        </div>
        <p>{recipe.description}</p>
        <div>
          <NavLink to={`/recipes/${recipe._id}`}>Learn more</NavLink>
          <button>
            <img src="" alt="" />
          </button>
        </div>
      </div>
    </>
  );
};

export default RecipeItem;
