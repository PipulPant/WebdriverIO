import { config as sharedConfig } from './base';
import { DESKTOP } from './capabilities';

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  runner: 'local',
  hostname: 'hub.browserstack.com',
  maxInstances: 2,
  logLevel: 'error',
  capabilities: [DESKTOP.CHROME],
  services: [
    [
      'browserstack',
      {
        browserstackLocal: true,
      },
    ],
  ],
};
