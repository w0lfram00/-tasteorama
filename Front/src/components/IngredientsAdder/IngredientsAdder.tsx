import React, { useState } from "react";
import s from "./IngredientsAdder.module.css";
import type { Ingredient } from "../../interfaces/db";
import IngredientItem from "./IngredientItem";
import CustomSelect from "../CustomSelect/CustomSelect";

interface Props {
  ingredients: Ingredient[];
  addedIngredients: { id: Ingredient; measure: string }[];
  addIngrFunc: (ingredient: { id: Ingredient; measure: string }) => void;
  removeFunc: (id: string) => void;
}

const IngredientsAdder = ({
  ingredients,
  addedIngredients,
  addIngrFunc,
  removeFunc,
}: Props) => {
  const [selectedIngr, setSelectedIngr] = useState<Ingredient>();
  const [measure, setMeasure] = useState<string>("");

  return (
    <div className={s.ingredientsAdder}>
      <div className={s.adder}>
        <div className={s.fields}>
          <label className={s.name}>
            Name
            <CustomSelect
              options={ingredients}
              name="ingredient"
              onChange={setSelectedIngr}
            />
          </label>
          <label className={s.amount}>
            Amount
            <input
              name="measure"
              onChange={(e) => setMeasure(e.target.value)}
              value={measure}
              placeholder="100g"
              autoComplete="off"
            />
          </label>
        </div>
        <button
          type="button"
          className="buttonGeneric"
          onClick={() => {
            if (
              selectedIngr &&
              measure &&
              !addedIngredients.some((ingr) => ingr.id._id == selectedIngr._id)
            ) {
              addIngrFunc({ id: selectedIngr, measure: measure });
              setMeasure("");
            }
          }}
        >
          Add new Ingredient
        </button>
      </div>
      {addedIngredients.length ? (
        <table className={s.list}>
          <thead>
            <tr>
              <th>Name:</th>
              <th>Amount:</th>
            </tr>
          </thead>
          <tbody>
            {addedIngredients.map((ingr) => (
              <tr key={ingr.id._id}>
                <IngredientItem ingredient={ingr} removeFunc={removeFunc} />
              </tr>
            ))}
          </tbody>
        </table>
      ) : undefined}
    </div>
  );
};

export default IngredientsAdder;
