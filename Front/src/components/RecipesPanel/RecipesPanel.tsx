import React from "react";
import RecipesHeader from "./RecipesHeader/RecipesHeader";
import RecipesList from "./RecipesList/RecipesList";

interface Props {
  title: string;
  filtered: boolean;
}

const RecipesPanel = ({ title, filtered }: Props) => {
  return (
    <div className="container">
      {title ? <h2>{title}</h2> : undefined}
      <RecipesHeader recipesCount={96} filtered={filtered} />
      <RecipesList recipes={[]} />
    </div>
  );
};

export default RecipesPanel;
