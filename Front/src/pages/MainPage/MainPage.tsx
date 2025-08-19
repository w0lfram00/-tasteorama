import { useEffect, useState } from "react";
import SearchPanel from "../../components/SearchPanel/SearchPanel";
import RecipesPanel from "../../components/RecipesPanel/RecipesPanel";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxForTypeScript";
import {
  selectFilterOptions,
  selectIsLoading,
  selectPage,
  selectPaginationInfo,
  selectRecipes,
} from "../../redux/recipes/selectors";
import { getAllRecipes } from "../../redux/recipes/operations";
import { setFilterOptions } from "../../redux/recipes/slice";
import { useSearchParams } from "react-router-dom";
import type { FilterOptions } from "../../interfaces/requests/recipes";
import ScreenLoader from "../../components/ScreenLoader/ScreenLoader";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector(selectRecipes);
  const paginationInfo = useAppSelector(selectPaginationInfo);
  const filterOptions = useAppSelector(selectFilterOptions);
  const isLoading = useAppSelector(selectIsLoading);
  const page = useAppSelector(selectPage);
  const [searchParams] = useSearchParams();
  const [filtersReady, setFiltersReady] = useState(false);

  const getSearchParams = (): FilterOptions => {
    const title = searchParams.get("title") || undefined;
    const category = searchParams.get("category") || undefined;
    const ingredient = searchParams.get("ingredient") || undefined;
    return { title, category, ingredient };
  };

  useEffect(() => {
    dispatch(setFilterOptions(getSearchParams()));
    setFiltersReady(true);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const currentParams = new URLSearchParams(window.location.search);
      const title = currentParams.get("title") || undefined;
      const category = currentParams.get("category") || undefined;
      const ingredient = currentParams.get("ingredient") || undefined;

      dispatch(setFilterOptions({ title, category, ingredient }));
      setFiltersReady(true);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!filtersReady) return;

    const timeout = setTimeout(() => {
      dispatch(
        getAllRecipes({
          perPage: 32,
          page,
          filter: filterOptions,
        })
      );
    }, 50);

    return () => clearTimeout(timeout);
  }, [page, filterOptions]);

  return (
    <>
      <SearchPanel initialValues={{ title: filterOptions.title || "" }} />
      <div className="container">
        <RecipesPanel
          title="Recipes"
          filtered={true}
          recipes={recipes}
          paginationInfo={paginationInfo}
          filterOptions={filterOptions}
        />
      </div>
      {page == 1 && isLoading && <ScreenLoader />}
    </>
  );
};

export default MainPage;
