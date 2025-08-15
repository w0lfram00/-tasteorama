import { useEffect } from "react";
import SearchPanel from "../../components/SearchPanel/SearchPanel";
import RecipesPanel from "../../components/RecipesPanel/RecipesPanel";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxForTypeScript";
import {
  selectFilterOptions,
  selectPage,
  selectPaginationInfo,
  selectRecipes,
} from "../../redux/recipes/selectors";
import { getAllRecipes } from "../../redux/recipes/operations";
import type { FilterOptions } from "../../interfaces/requests/recipes";
import { resetRecipes, setFilterOptions } from "../../redux/recipes/slice";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector(selectRecipes);
  const paginationInfo = useAppSelector(selectPaginationInfo);
  const filterOptions = useAppSelector(selectFilterOptions);
  const page = useAppSelector(selectPage);

  useEffect(() => {
    dispatch(resetRecipes());
    dispatch(getAllRecipes({ perPage: 32, page, filter: filterOptions }));
  }, [dispatch, page]);

  const onSubmit = (filter: FilterOptions) => {
    dispatch(resetRecipes());
    dispatch(setFilterOptions(filter));
    dispatch(
      getAllRecipes({
        perPage: 32,
        page,
        filter: { ...filterOptions, title: filter.title },
      })
    );
  };

  return (
    <>
      <SearchPanel onSubmit={onSubmit} />
      <div className="container">
        <RecipesPanel
          title="Recipes"
          filtered={true}
          recipes={recipes}
          paginationInfo={paginationInfo}
          filterOptions={filterOptions}
        />
      </div>
    </>
  );
};

export default MainPage;
