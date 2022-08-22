export const isUSCurrency = (currencyText: string): boolean => {
  if (currencyText[0] !== '$') return false;
  const parsedNumber = parseCurrencyText(currencyText);
  return !isNaN(parsedNumber);
};

export const parseCurrencyText = (currencyText: string): number => {
  return parseFloat(currencyText.replace(/^\D+/g, ''));
};

export const toCurrencyText = (amount: number): string => `$${amount.toFixed(2)}`;
