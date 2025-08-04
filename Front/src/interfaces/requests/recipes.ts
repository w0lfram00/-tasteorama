import type { Recipe, User } from "../db";
import type { Request } from "./request";

export interface CreateRecipe extends Omit<Recipe, "_id"> {}

interface Pagination
  extends Partial<{
    page: number;
    perPage: number;
  }> {}

export interface PaginationInfo extends Omit<Pagination, "page"> {
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface GetAllRecipesForUser extends Pagination {
  user: User;
}

export interface FilterOptions
  extends Partial<{
    title: string;
    category: string;
    ingredient: string;
  }> {}

export interface GetAllRecipesFiltered extends Pagination {
  filter?: FilterOptions;
}

export interface GetAllRecipesResult
  extends Request<{ data: Recipe[]; page: number } & PaginationInfo> {}
