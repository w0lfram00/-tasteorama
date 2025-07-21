import type QueryString from 'qs';
import { parseString } from './parseString.ts';

export const parseFilterParams = ({
  title,
  ingredient,
  category,
}: QueryString.ParsedQs) => {
  return {
    title: parseString(title as string, 100),
    ingredient: parseString(ingredient as string, 30),
    category: parseString(category as string, 30),
  };
};
