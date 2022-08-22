import { loggedOut, removeLocalStorageItem, waitForLoggedOut } from 'utils';

import { e2eConfig } from 'conf/environment';

import { PageElement } from '../../types';

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
  private readonly defaultTimeout = 90000;

  public get loader(): PageElement {
    return $('.page-loader');
  }

  public get otgArrowLeftBtn(): PageElement {
    return $('button.otg-arrow-left');
  }

  public waitForLoad(timeout = this.defaultTimeout): Promise<void | boolean> {
    return this.loader.waitForExist({ reverse: true, timeout });
  }

  public async openAndWaitForLoad(path = '', timeout = this.defaultTimeout): Promise<void> {
    await this.open(path);
    await this.waitForLoad(timeout);
  }

  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  public open(path = ''): Promise<string> {
    return browser.url(`${e2eConfig.baseUrl}/${path}`);
  }

  public async navigateBack(): Promise<void> {
    if (await this.otgArrowLeftBtn.isExisting()) {
      await this.otgArrowLeftBtn.click();
    }
  }

  public async logOut(): Promise<void> {
    if (await loggedOut()) return;
    await removeLocalStorageItem('otgAuthToken');
    await waitForLoggedOut();
    await browser.refresh();
    await this.waitForLoad();
  }
}
