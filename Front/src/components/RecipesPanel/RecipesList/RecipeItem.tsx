import React from "react";
import type { Recipe } from "../../../interfaces/db";
import { NavLink } from "react-router-dom";
import Flag from "../../../assets/flag.svg";
import Clock from "../../../assets/clock.svg";
import s from "./RecipesList.module.css";
import trimToLength from "../../../utils/trimToLength";

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
      <div className={s.cardContent}>
        <div className={s.cardTitle}>
          <h3>{recipe.title}</h3>
          <div className={s.time}>
            <img src={Clock} alt="clock icon" /> <span>{recipe.time}</span>
          </div>
        </div>
        <p>
          {recipe.description.length < 53
            ? recipe.description
            : trimToLength(recipe.description, 53)}
        </p>
        <div className={s.buttons}>
          <NavLink to={`/recipes/${recipe._id}`}>Learn more</NavLink>
          <button>
            <img src={Flag} alt="save button" />
          </button>
        </div>
      </div>
    </>
  );
};

export default RecipeItem;
