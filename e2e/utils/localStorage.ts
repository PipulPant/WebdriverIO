export const getLocalStorageSize = (): Promise<number> => browser.execute(() => window.localStorage.length);

export const getKeyOfLocalStorage = (index: number): Promise<string | null> =>
  browser.execute(index => window.localStorage.key(index), index);

export const getLocalStorageItem = (key: string): Promise<string | null> =>
  browser.execute(key => window.localStorage.getItem(key), key);

export const clearLocalStorage = (): Promise<void> => browser.execute(() => window.localStorage.clear());

export const setLocalStorageItem = (key: string, value: string): Promise<void> =>
  browser.execute(key => window.localStorage.setItem(key, value), key);

export const removeLocalStorageItem = (key: string): Promise<void> =>
  browser.execute(key => window.localStorage.removeItem(key), key);
