import Bin from "../../assets/trash-bin.svg";
import { useAppDispatch } from "../../hooks/reduxForTypeScript";
import { deleteRecipeById } from "../../redux/recipes/operations";

interface Props {
  recipeId: string;
  className?: string;
}

const DeleteButton = ({ recipeId, className }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <button
      className={className}
      onClick={() => dispatch(deleteRecipeById(recipeId))}
    >
      <img src={Bin} alt="trash bin" />
    </button>
  );
};

export default DeleteButton;
