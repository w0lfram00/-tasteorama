import type { Recipe, User } from "../db";

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

export interface GetAllRecipesFiltered extends Pagination {
  filter: Partial<{
    title: string;
    category: string;
    ingredient: string;
  }>;
}
{
}
