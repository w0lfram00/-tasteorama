import Flag from "./Flag";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxForTypeScript";
import { saveRecipe } from "../../redux/recipes/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import successToast from "../../utils/toasts/successToast";

interface Props {
  recipeId: string;
  className?: string;
  text?: string;
}

const SaveButton = ({ recipeId, text, className }: Props) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <button
      className={className}
      onClick={() => {
        if (isLoggedIn) dispatch(saveRecipe(recipeId));
        else successToast("To save recipes log in first");
      }}
    >
      {text}
      <Flag />
    </button>
  );
};

export default SaveButton;
