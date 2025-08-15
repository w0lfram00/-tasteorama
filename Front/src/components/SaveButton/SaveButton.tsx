import Flag from "./Flag";
import { useAppDispatch } from "../../hooks/reduxForTypeScript";
import { saveRecipe } from "../../redux/recipes/operations";

interface Props {
  recipeId: string;
  className?: string;
  text?: string;
}

const SaveButton = ({ recipeId, text, className }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <button
      className={className}
      onClick={() => dispatch(saveRecipe(recipeId))}
    >
      {text}
      <Flag />
    </button>
  );
};

export default SaveButton;
