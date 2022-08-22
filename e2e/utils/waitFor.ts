import { WdioElement } from 'types';

import { getLocalStorageItem } from './localStorage';

interface WaitUntilOptions {
  timeout?: number;
  interval?: number;
  timeoutMsg?: string;
  suppressError?: boolean;
}

type WaitForFunc = () => Promise<boolean>;

export const waitUntil = async (
  condition: () => boolean | Promise<boolean>,
  waitUntilOptions?: WaitUntilOptions,
): Promise<boolean> => {
  try {
    await browser.waitUntil(condition, waitUntilOptions);
    return true;
  } catch (err) {
    if (waitUntilOptions?.suppressError) return false;
    throw err;
  }
};

export const imageDisplayed = (imageElement: WdioElement): WaitForFunc => {
  return async (): Promise<boolean> => {
    const image = await imageElement;
    const isDisplayed = await image.isDisplayed();
    const naturalWidth = await image.getProperty('naturalWidth');

    return isDisplayed && typeof naturalWidth === 'number' && naturalWidth > 0;
  };
};

export const inputFilled = (inputElement: WdioElement): WaitForFunc => {
  return async (): Promise<boolean> => Boolean(await (await inputElement).getValue());
};

export const loggedIn = async (): Promise<boolean> => (await getLocalStorageItem('otgAuthToken')) !== null;
export const loggedOut = async (): Promise<boolean> => (await getLocalStorageItem('otgAuthToken')) === null;

export const waitForOr = (...waitForFuncs: WaitForFunc[]): WaitForFunc => {
  return async (): Promise<boolean> =>
    waitForFuncs.reduce(async (acc, cur) => (await acc) || (await cur()), Promise.resolve(false));
};

export const waitForImageDisplayed = (imageElement: WdioElement, options?: WaitUntilOptions): Promise<boolean> =>
  waitUntil(imageDisplayed(imageElement), options);

export const waitForInputFilled = (inputElement: WdioElement, options?: WaitUntilOptions): Promise<boolean> =>
  waitUntil(inputFilled(inputElement), options);

export const waitForLoggedIn = (options?: WaitUntilOptions): Promise<boolean> => waitUntil(loggedIn, options);
export const waitForLoggedOut = (options?: WaitUntilOptions): Promise<boolean> => waitUntil(loggedOut, options);
