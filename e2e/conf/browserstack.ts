import { config as sharedConfig } from './base';
import { DESKTOP, MOBILE } from './capabilities';

export const config: WebdriverIO.Config = {
  ...sharedConfig, // extending the base.ts class
  hostname: 'hub.browserstack.com', //host for the browser stack
  maxInstances: 2, // maximum of 2 instance of browser
  logLevel: 'error', // only error to be logged
  capabilities: [DESKTOP.CHROME, DESKTOP.FIREFOX, DESKTOP.SAFARI, MOBILE.SAFARI, MOBILE.CHROME, MOBILE.SAMSUNG],
  services: ['browserstack'], //using only browserstack service for automation
};
