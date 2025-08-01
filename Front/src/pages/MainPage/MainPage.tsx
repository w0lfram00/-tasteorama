import React from "react";
import SearchPanel from "../../components/SearchPanel/SearchPanel";
import RecipesPanel from "../../components/RecipesPanel/RecipesPanel";

const MainPage = () => {
  const onSubmit = () => {};

  return (
    <>
      <SearchPanel onSubmit={onSubmit} />
      <RecipesPanel title="Recipes" filtered={true} />
    </>
  );
};

export default MainPage;
