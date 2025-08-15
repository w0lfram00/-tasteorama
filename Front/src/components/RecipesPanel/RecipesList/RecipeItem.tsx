import React from "react";
import type { Recipe } from "../../../interfaces/db";
import { NavLink } from "react-router-dom";
import Clock from "../../../assets/clock.svg";
import s from "./RecipesList.module.css";
import trimToLength from "../../../utils/trimToLength";
import SaveButton from "../../SaveButton/SaveButton";
import clsx from "clsx";
import { useAppSelector } from "../../../hooks/reduxForTypeScript";
import { selectSavedRecipes } from "../../../redux/recipes/selectors";
import DeleteButton from "../../DeleteButton/DeleteButton";

interface Props {
  recipe: Recipe;
  deleteButton: boolean;
}

const RecipeItem = ({ recipe, deleteButton }: Props) => {
  const savedRecipes = useAppSelector(selectSavedRecipes);

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
          {deleteButton ? (
            <DeleteButton recipeId={recipe._id} className={s.delete} />
          ) : (
            <SaveButton
              className={clsx(
                savedRecipes?.some((id) => id == recipe._id) && s.checked
              )}
              recipeId={recipe._id}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default RecipeItem;
