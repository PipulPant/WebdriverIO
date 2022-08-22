import { version } from '../../package.json';

//exporting the desktop capabilties for automation
export const DESKTOP = {
  CHROME: {
    browserName: 'chrome',
    'bstack:options': { buildName: `floXgen_v${version}-desktop-chrome` },
  },
  FIREFOX: {
    browserName: 'firefox',
    'bstack:options': { buildName: `floXgen_v${version}-desktop-firefox` },
  },
  SAFARI: {
    browserName: 'safari',
    browserVersion: '15.3',
    'bstack:options': { buildName: `floXgen_v${version}-desktop-safari` },
  },
};

// exporting the mobile capabilities for the mobile
export const MOBILE = {
  SAFARI: {
    'bstack:options': {
      deviceName: 'iPhone 13',
      realMobile: true,
      buildName: `floXgen_v${version}-mobile-safari`,
    },
    browserName: 'safari',
  },
  CHROME: {
    'bstack:options': {
      deviceName: 'Google Pixel 6',
      realMobile: true,
      buildName: `floXgen_v${version}-mobile-chrome`,
    },
    browserName: 'chrome',
  },
  SAMSUNG: {
    'bstack:options': {
      deviceName: 'Samsung Galaxy S22',
      realMobile: true,
      buildName: `floXgen_v${version}-mobile-samsung`,
    },
    browserName: 'samsung',
  },
};
