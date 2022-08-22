export const roundDecimal = (num: number, decimalPlaces: number): number => {
  const roundMultiplierDivider = 10 ** decimalPlaces;
  return Math.round((num + Number.EPSILON) * roundMultiplierDivider) / roundMultiplierDivider;
};

export const generateRandomNumber = (min: number, max: number): number => min + Math.floor(Math.random() * (max - min));

export const extractDigits = (text: string): string => text.replace(/[^0-9]/g, '');

export const extractNumber = (text: string): number => parseFloat(extractDigits(text));
