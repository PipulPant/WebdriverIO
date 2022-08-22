export const currentUtcTime = (): string => {
  const date = new Date();
  return date
    .toLocaleTimeString('en-US', { timeZone: 'UTC', hour: 'numeric', minute: 'numeric', hour12: true })
    .replace('AM', '')
    .replace('PM', '');
};
