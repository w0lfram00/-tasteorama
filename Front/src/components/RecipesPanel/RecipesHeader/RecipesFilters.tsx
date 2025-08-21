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
import { useSearchParams } from "react-router-dom";
import { resetFilters, setFilterOptions } from "../../../redux/recipes/slice";
import {
  selectFilterOptions,
  selectNavigateTrigger,
} from "../../../redux/recipes/selectors";
import clearSearchParams from "../../../utils/clearSearchParam";

const RecipesFilters = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const ingredients = useAppSelector(selectIngredients);
  const [clear, setClear] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const navigateTrigger = useAppSelector(selectNavigateTrigger);
  const [initialIngr, setInitialIngr] = useState<{ value: string | undefined }>(
    { value: "" }
  );
  const [initialCat, setInitialCat] = useState<{ value: string | undefined }>({
    value: "",
  });
  const filterOptions = useAppSelector(selectFilterOptions);
  const [ingrsReady, setIngrsReady] = useState(false);

  useEffect(() => {
    const func = async () => {
      dispatch(getCategories());
      await dispatch(getIngredients()).unwrap();
      setIngrsReady(true);
    };
    func();
  }, []);

  useEffect(() => {
    if (!ingrsReady) return;

    const ingrToSet =
      ingredients.find((ingr) => ingr._id == searchParams.get("ingredient"))
        ?.name || "";
    setInitialIngr({ value: ingrToSet });

    const catToSet = searchParams.get("category") || "";
    setInitialCat({ value: catToSet });
  }, [navigateTrigger, ingrsReady]);

  return (
    <div className={s.filters}>
      <button
        className={s.reset}
        onClick={() => {
          setClear((prev) => !prev);
          clearSearchParams();
          dispatch(resetFilters());
        }}
      >
        Reset filters
      </button>

      <CustomSelect
        name="category"
        options={categories}
        initialValue={initialCat}
        onChange={(value: { name: string; _id: string }) => {
          updateSearchParams("category", value.name);
          dispatch(setFilterOptions({ category: value.name }));
        }}
        fontsClass={s.selectFonts}
        inputClass={s.select}
        resetFunc={() => {
          updateSearchParams("category", "");
          if (filterOptions.category)
            dispatch(setFilterOptions({ category: undefined }));
        }}
        clearTrigger={clear}
      />
      <CustomSelect
        name="ingredient"
        options={ingredients}
        initialValue={initialIngr}
        onChange={(value: { name: string; _id: string }) => {
          updateSearchParams("ingredient", value._id);
          dispatch(setFilterOptions({ ingredient: value._id }));
        }}
        fontsClass={s.selectFonts}
        inputClass={s.select}
        resetFunc={() => {
          updateSearchParams("ingredient", "");
          if (filterOptions.ingredient)
            dispatch(setFilterOptions({ ingredient: undefined }));
        }}
        clearTrigger={clear}
      />
    </div>
  );
};

export default RecipesFilters;
