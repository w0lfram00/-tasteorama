import React from "react";
import type { Recipe } from "../../../interfaces/db";
import RecipeItem from "./RecipeItem";
import s from "./RecipesList.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/reduxForTypeScript";
import { nextPage, resetFilters } from "../../../redux/recipes/slice";
import type { PaginationInfo } from "../../../interfaces/requests/recipes";
import { selectIsLoading } from "../../../redux/recipes/selectors";
import Loader from "../../Loader/Loader";

interface Props {
  recipes: Array<Recipe>;
  paginationInfo: PaginationInfo;
  deleteButton: boolean;
}

const RecipesList = ({ recipes, paginationInfo, deleteButton }: Props) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  return recipes.length ? (
    <div>
      <ul className={s.recipeList}>
        {recipes.map((recipe) => (
          <li className={s.recipeCard} key={recipe._id}>
            <RecipeItem recipe={recipe} deleteButton={deleteButton} />
          </li>
        ))}
      </ul>
      {!isLoading && paginationInfo.hasNextPage && (
        <button
          className={s.loadMore}
          onClick={() => {
            dispatch(nextPage());
          }}
        >
          Load More
        </button>
      )}
      {isLoading && <Loader />}
    </div>
  ) : !isLoading ? (
    <div className={s.notFound}>
      <h3>We're sorry! We were not able to find a match.</h3>
      <button
        onClick={() => {
          dispatch(resetFilters());
        }}
      >
        Reset search and filters
      </button>
    </div>
  ) : (
    <Loader />
  );
};

export default RecipesList;
