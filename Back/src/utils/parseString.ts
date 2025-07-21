export const parseString = (
  string: string,
  maxLength: number,
  defaultValue?: string,
) => {
  if (!(typeof string === 'string')) return defaultValue;
  if (string.length > maxLength) return defaultValue;

  return string;
};
