import type { Ingredient } from "../db";
import type { Request } from "./request";

export interface GetIngredients extends Request<Ingredient[]> {}
