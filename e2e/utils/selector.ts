import { PageElement, PageElements } from 'types';

export const $wdio = (dataSelector: string): PageElement => $(`[data-wdio="${dataSelector}"]`);
export const $$wdio = (dataSelector: string): PageElements => $$(`[data-wdio="${dataSelector}"]`);
