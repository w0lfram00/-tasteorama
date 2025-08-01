import React from "react";

interface Props {
  recipesCount: number;
  filtered: boolean;
}

const RecipesHeader = ({ recipesCount, filtered }: Props) => {
  return (
    <div>
      <div>{recipesCount} recipes</div>
      {filtered ? (
        <div>
          <button>Reset filters</button>
          <input type="select" placeholder="Category" />
          <input type="select" placeholder="Ingredient" />
        </div>
      ) : undefined}
    </div>
  );
};

export default RecipesHeader;
