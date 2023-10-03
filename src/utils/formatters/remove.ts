export const removeSpecialCharacters = (value: string): string => {
  return value.replace(/[^\w\s]/gi, '');
};