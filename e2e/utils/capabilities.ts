import { Capabilities } from '@wdio/types';

export const isSafariBrowser = (): boolean => {
  const browserCapability = browser.requestedCapabilities as Capabilities.Capabilities;
  return browserCapability.browserName === 'safari';
};
