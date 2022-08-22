import { config as sharedConfig } from './base';

export const config: WebdriverIO.Config = {
  ...sharedConfig, // extending the shared config (base.ts)
  runner: 'local', // local runner
  services: ['chromedriver'], // using chromdriver as a service to run chrome
  maxInstances: 1, // only one instance to be opened for automation
};
