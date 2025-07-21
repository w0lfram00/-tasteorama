import type QueryString from 'qs';
import { parseNumber } from './parseNumber.ts';

export const parsePaginationParams = (query: QueryString.ParsedQs) => {
  const { page, perPage } = query;

  return {
    page: parseNumber(page as string, 1),
    perPage: parseNumber(perPage as string, 10),
  };
};
