export const calculateDiscountPercentage = (price: number, promotionalPrice: number): string => {
  if (price < 1 || promotionalPrice < 1) throw new Error('Prices must be greater than zero');

  const discountAmount = price - promotionalPrice;
  const discountPercentage = (discountAmount / price) * 100;

  return discountPercentage.toFixed(0);
};