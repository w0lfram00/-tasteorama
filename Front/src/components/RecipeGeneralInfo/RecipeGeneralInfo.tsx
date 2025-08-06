import React from "react";
import s from "./recipeGeneralInfo.module.css";
import approximateCookTime from "../../utils/approximateCookTime";
import type { RecipeDetailed } from "../../interfaces/db";
import SaveButton from "../SaveButton/SaveButton";

interface Props {
  recipe: RecipeDetailed;
}

const RecipeGeneralInfo = ({ recipe }: Props) => {
  return (
    <div className={s.generalInfo}>
      <div className={s.info}>
        <h3>General information</h3>
        <div>
          <span>Category: </span>
          {recipe.category}
        </div>
        <div>
          <span>Cooking time: </span>
          {approximateCookTime(recipe.time)}
        </div>
      </div>
      <SaveButton text="Save" />
    </div>
  );
};

export default RecipeGeneralInfo;
