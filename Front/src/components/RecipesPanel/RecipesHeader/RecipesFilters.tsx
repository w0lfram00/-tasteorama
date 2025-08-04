import React, { useEffect, useState } from "react";
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
        inputValue={filterOptions.category}
        options={categories}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          console.log(1);

          dispatch(setFilterOptions({ category: e.target.value }));
        }}
      />

      <input type="select" placeholder="Category" />
      <input type="select" placeholder="Ingredient" />
    </div>
  );
};

export default RecipesFilters;
