import { useEffect, useState } from "react";
import CustomSelect from "../../CustomSelect/CustomSelect";
import s from "./RecipesHeader.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/reduxForTypeScript";
import { selectCategories } from "../../../redux/categories/selectors";
import { selectIngredients } from "../../../redux/ingredients/selectors";
import { getCategories } from "../../../redux/categories/operations";
import { getIngredients } from "../../../redux/ingredients/operations";
import updateSearchParams from "../../../utils/updateSearchParams";

const RecipesFilters = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const ingredients = useAppSelector(selectIngredients);
  const [clear, setClear] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIngredients());
  }, []);

  return (
    <div className={s.filters}>
      <button
        className={s.reset}
        onClick={() => {
          setClear((prev) => !prev);
        }}
      >
        Reset filters
      </button>

      <CustomSelect
        name="category"
        options={categories}
        onChange={(value: { name: string; _id: string }) => {
          updateSearchParams("category", value.name);
        }}
        fontsClass={s.selectFonts}
        inputClass={s.select}
        resetFunc={() => {
          updateSearchParams("category", "");
        }}
        clearTrigger={clear}
      />
      <CustomSelect
        name="ingredient"
        options={ingredients}
        onChange={(value: { name: string; _id: string }) => {
          updateSearchParams("ingredient", value._id);
        }}
        fontsClass={s.selectFonts}
        inputClass={s.select}
        resetFunc={() => {
          updateSearchParams("ingredient", "");
        }}
      />
    </div>
  );
};

export default RecipesFilters;
