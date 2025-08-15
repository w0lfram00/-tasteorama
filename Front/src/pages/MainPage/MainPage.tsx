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
import { useSearchParams } from "react-router-dom";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector(selectRecipes);
  const paginationInfo = useAppSelector(selectPaginationInfo);
  const filterOptions = useAppSelector(selectFilterOptions);
  const page = useAppSelector(selectPage);
  const [searchParams] = useSearchParams();

  const getSearchParams = () => {
    const title = searchParams.get("title") || undefined;
    const category = searchParams.get("category") || undefined;
    const ingredient = searchParams.get("ingredient") || undefined;
    return { title, category, ingredient };
  };

  const submit = () => {
    console.log(getSearchParams());

    dispatch(
      getAllRecipes({
        perPage: 32,
        page,
        filter: getSearchParams(),
      })
    );
  };
  useEffect(() => {
    submit();
  }, [page, searchParams]);

  return (
    <>
      <SearchPanel onSubmit={submit} />
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
