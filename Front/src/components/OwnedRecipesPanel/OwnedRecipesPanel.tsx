import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxForTypeScript";
import {
  selectPage,
  selectPaginationInfo,
  selectRecipes,
} from "../../redux/recipes/selectors";
import { getOwnedRecipes } from "../../redux/recipes/operations";
import RecipesPanel from "../RecipesPanel/RecipesPanel";
import { resetRecipes } from "../../redux/recipes/slice";

const OwnedRecipesPanel = () => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector(selectRecipes);
  const paginationInfo = useAppSelector(selectPaginationInfo);
  const page = useAppSelector(selectPage);

  useEffect(() => {
    dispatch(resetRecipes());
    dispatch(getOwnedRecipes({ page: page, perPage: 32 }));
  }, [page]);

  return (
    <RecipesPanel
      recipes={recipes}
      paginationInfo={paginationInfo}
      filtered={false}
      deleteButton={true}
    />
  );
};

export default OwnedRecipesPanel;
