import React, { useEffect } from "react";
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
import { setFilterOptions } from "../../../redux/recipes/slice";
import { selectFilterOptions } from "../../../redux/recipes/selectors";

const RecipesFilters = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const ingredients = useAppSelector(selectIngredients);
  const filterOptions = useAppSelector(selectFilterOptions);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIngredients());
  }, []);

  return (
    <div className={s.filters}>
      <button className={s.reset}>Reset filters</button>

      <CustomSelect
        name="category"
        options={categories}
        onChange={(value: { name: string; _id: string }) => {
          dispatch(setFilterOptions({ category: value.name }));
        }}
        fontsClass={s.selectFonts}
        inputClass={s.select}
        resetFunc={() => {
          dispatch(setFilterOptions({ category: "" }));
        }}
      />
      <CustomSelect
        name="ingredient"
        options={ingredients}
        onChange={(value: { name: string; _id: string }) => {
          dispatch(setFilterOptions({ ingredient: value._id }));
        }}
        fontsClass={s.selectFonts}
        inputClass={s.select}
        resetFunc={() => {
          dispatch(setFilterOptions({ ingredient: "" }));
        }}
      />
    </div>
  );
};

export default RecipesFilters;
