import { ChainablePromiseElement, ChainablePromiseArray, ElementArray } from 'webdriverio';

export type PageElement = ChainablePromiseElement<WebdriverIO.Element>;
export type PageElements = ChainablePromiseArray<ElementArray>;

export type WdioElement = PageElement | WebdriverIO.Element;
export type WdioElements = PageElements | ElementArray;

export type NavigationAction = 'Delivery' | 'Orders' | 'Account';
