import { useAppDispatch } from "../../hooks/reduxForTypeScript";
import s from "./RecipesPanel.module.css";
import { resetFilters } from "../../redux/recipes/slice";
import { getAllRecipes } from "../../redux/recipes/operations";

const NoRecipes = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={s.notFound}>
      <h3>We're sorry! We were not able to find a match.</h3>
      <button
        onClick={() => {
          dispatch(resetFilters());
          dispatch(getAllRecipes({ perPage: 32 }));
        }}
      >
        Reset search and filters
      </button>
    </div>
  );
};

export default NoRecipes;
