export const parseNumber = (
  number: string | undefined,
  defaultValue?: number,
) => {
  if (!(typeof number === 'string')) return defaultValue;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) {
    return defaultValue;
  }
  return parsedNumber;
};
