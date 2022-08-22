/* eslint-disable no-console */
import { WebDriverLogTypes } from '@wdio/types/build/Options';
import { remote } from 'webdriverio';

import { IMailService, MailCriteria, MailMessage, MailServiceSetProps } from './types';

/** driver capabilities for headless browser to scrap mail sites  */
const driverOptions = {
  logLevel: 'error' as WebDriverLogTypes,
  capabilities: {
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: ['disable-infobars', '--headless'],
    },
  },
};

abstract class BaseMailService implements IMailService {
  protected browser?: WebdriverIO.Browser;
  protected reuseBrowser = false;
  protected emailPrefix = this.autoEmailPrefix;
  protected defaultReceiveTimeout = 5000;

  protected get autoEmailPrefix(): string {
    return `e2e_${new Date().getTime()}`;
  }

  public abstract get emailAddress(): string;
  public abstract set emailAddress(emailAddress: string);
  protected abstract searchAndParseMail(mailCriteria?: MailCriteria): Promise<MailMessage>;

  public async start(): Promise<this> {
    if (this.browser) return this;
    this.browser = await remote(driverOptions);
    return this;
  }

  public async stop(): Promise<void> {
    await this.browser?.deleteSession();
    delete this.browser;
  }

  public set({ email, reuse, useNewEmail, receiveTimeout }: MailServiceSetProps): this {
    if (useNewEmail) this.emailPrefix = this.autoEmailPrefix;
    if (email) this.emailAddress = email;
    if (reuse) this.reuseBrowser = reuse;
    if (receiveTimeout) this.defaultReceiveTimeout = receiveTimeout;

    return this;
  }

  public async getMail(mailCriteria?: MailCriteria): Promise<MailMessage> {
    try {
      return await this.searchAndParseMail(mailCriteria);
    } finally {
      if (!this.reuseBrowser) await this.stop();
    }
  }

  public async getCodeFromMail(mailCriteria?: MailCriteria): Promise<string | undefined> {
    const message = await this.getMail(mailCriteria);
    return message.code;
  }
}

export default BaseMailService;
