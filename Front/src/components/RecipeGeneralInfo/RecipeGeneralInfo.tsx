import approximateCookTime from "../../utils/approximateCookTime";
import type { RecipeDetailed } from "../../interfaces/db";
import SaveButton from "../SaveButton/SaveButton";
import clsx from "clsx";
import { useAppSelector } from "../../hooks/reduxForTypeScript";
import { selectSavedRecipes } from "../../redux/recipes/selectors";
import s from "./RecipeGeneralInfo.module.css";

interface Props {
  recipe: RecipeDetailed;
}

const RecipeGeneralInfo = ({ recipe }: Props) => {
  const savedRecipes = useAppSelector(selectSavedRecipes);

  const isSaved = savedRecipes?.some((id) => id == recipe._id);

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
      <SaveButton
        className={clsx(isSaved && s.checked, "buttonGeneric")}
        recipeId={recipe._id}
        text={isSaved ? "Unsave" : "Save"}
      />
    </div>
  );
};

export default RecipeGeneralInfo;
