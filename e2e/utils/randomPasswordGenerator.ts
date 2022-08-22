import generator from 'generate-password';

export const generateRandomPassword = (): string => {
  return generator.generate({
    length: 10,
    numbers: true,
    symbols: true,
    strict: true,
    exclude: '<>^()_+[]{}:;|\'"\\,./~`=',
  });
};
