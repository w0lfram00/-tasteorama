import type { Ingredient } from "../../interfaces/db";
import s from "./IngredientsAdder.module.css";
import Trash from "./Trash";

interface Props {
  ingredient: { id: Ingredient; measure: string };
  removeFunc: (id: string) => void;
}

const IngredientItem = ({ ingredient, removeFunc }: Props) => {
  return (
    <>
      <td className={s.nameCol}>{ingredient.id.name}</td>
      <td className={s.measureCol}>{ingredient.measure}</td>
      <td>
        <button onClick={() => removeFunc(ingredient.id._id)}>
          <Trash />
        </button>
      </td>
    </>
  );
};

export default IngredientItem;
