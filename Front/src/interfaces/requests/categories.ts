import type { Category } from "../db";
import type { Request } from "./request";

export interface GetCategories extends Request<Category[]> {}
