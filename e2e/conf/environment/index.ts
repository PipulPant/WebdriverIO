import { devEnvConfig } from './development';
import { localEnvConfig } from './local';
import { qaEnvConfig } from './qa';

const defaultEnvConfig = {
  baseUrl: '',
  adminApi: '',
  vendors: {
    tinyCode: '',
    holdroomTinyCode: '',
    orderType: '',
    deliveryLocation: '',
  },
  browserStack: {
    username: process.env.BROWSERSTACK_USERNAME || '',
    accessKey: process.env.BROWSERSTACK_ACCESS_KEY || '',
  },
  mailosaur: {
    serverId: process.env.MAILOSAUR_SERVER_ID || '',
    apiKey: process.env.MAILOSAUR_API_KEY,
  },
};

const envConfig = {
  local: localEnvConfig,
  development: devEnvConfig,
  qa: qaEnvConfig,
}[process.env.APP_ENV || 'development'];

export const e2eConfig = { ...defaultEnvConfig, ...envConfig };
