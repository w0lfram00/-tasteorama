import React, { useEffect } from "react";
import RecipesPanel from "../RecipesPanel/RecipesPanel";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxForTypeScript";
import { getSavedRecipes } from "../../redux/recipes/operations";
import {
  selectPage,
  selectPaginationInfo,
  selectRecipes,
} from "../../redux/recipes/selectors";
import { resetRecipes, setPage } from "../../redux/recipes/slice";

const SavedRecipesPanel = () => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector(selectRecipes);
  const paginationInfo = useAppSelector(selectPaginationInfo);
  const page = useAppSelector(selectPage);

  useEffect(() => {
    dispatch(resetRecipes());
    dispatch(getSavedRecipes({ page: page, perPage: 32 }));
  }, [page]);

  useEffect(() => {
    return () => {
      dispatch(setPage(1));
    };
  }, []);

  return (
    <RecipesPanel
      recipes={recipes}
      paginationInfo={paginationInfo}
      filtered={false}
    />
  );
};

export default SavedRecipesPanel;
