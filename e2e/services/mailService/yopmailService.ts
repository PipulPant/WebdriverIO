/* eslint-disable no-console */
import { PageElement } from 'types';
import { extractDigits } from 'utils/number';

import BaseMailService from './base';
import { MailCriteria, MailMessage } from './types';

class YopmailService extends BaseMailService {
  private readonly homeUrl = 'https://yopmail.com/en';
  private readonly inboxUrl = 'https://yopmail.com/en/wm';

  public get emailAddress(): string {
    return `${this.emailPrefix}@yopmail.com`;
  }

  private set emailAddress(emailAddress: string) {
    if (!emailAddress.includes('@yopmail.com')) throw Error('Use @yopmail.com domain email');

    this.emailPrefix = emailAddress.split('@')[0];
  }

  private get emailInput(): PageElement {
    return this.browser!.$('.ycptinput');
  }

  private get checkInboxBtn(): PageElement {
    return this.browser!.$('#refreshbut button');
  }

  private get currentInboxLabel(): PageElement {
    return this.browser!.$('.bname');
  }

  private get refreshBtn(): PageElement {
    return this.browser!.$('#refresh');
  }

  private get currentMailDiv(): PageElement {
    return this.browser!.$('div[currentmail]');
  }

  private get currentMailIframe(): PageElement {
    return this.browser!.$('#ifmail');
  }

  private get bodyMail(): PageElement {
    return this.browser!.$('.bodymail');
  }

  private async hasHomeUrl(): Promise<boolean> {
    if (!this.browser) return false;
    return (await this.browser.getUrl()).includes(this.homeUrl);
  }

  private async hasInboxUrl(): Promise<boolean> {
    if (!this.browser) return false;
    return (await this.browser.getUrl()).includes(this.inboxUrl);
  }

  private async hasCurrentEmailInbox(): Promise<boolean> {
    return (await this.currentInboxLabel.getText()) === this.emailAddress;
  }

  private async createInbox(): Promise<void> {
    if (!this.browser) await this.start();
    if (!(await this.hasHomeUrl())) await this.browser?.url(this.homeUrl);
    await this.emailInput.setValue(this.emailPrefix);

    try {
      await this.checkInboxBtn.click();
    } catch {
      if (await this.hasInboxUrl()) return;
      throw Error('Could not create Yopmail inbox');
    }
  }

  private async openInbox(): Promise<void> {
    if (!this.browser) await this.start();
    if (!(await this.hasInboxUrl())) await this.browser?.url(this.inboxUrl);
    if ((await this.hasInboxUrl()) && (await this.hasCurrentEmailInbox())) {
      await this.refreshInbox();
      return;
    }

    await this.createInbox();
  }

  private async refreshInbox(): Promise<void> {
    try {
      await this.refreshBtn.click();
    } catch {
      return;
    }
  }

  private async parseMail(): Promise<MailMessage> {
    const mailMessage: MailMessage = {};
    const mailBody = await this.bodyMail.$('main #mail');
    mailMessage.text = await mailBody.getText();
    mailMessage.html = await mailBody.getHTML();

    try {
      const mailHeaderDivs = await this.bodyMail.$('header').$$('div.fl');
      const mailHeaderDiv = mailHeaderDivs[1];
      const mailHeaderDetailDivs = await mailHeaderDiv.$$('div');
      mailMessage.subject = await mailHeaderDetailDivs[0].getText();
      mailMessage.sender = await mailHeaderDetailDivs[1].$('.ellipsis').getText();
      mailMessage.dateTime = await mailHeaderDetailDivs[2].$('.ellipsis').getText();
    } catch {
      console.warn('Could not parse email header!');
    }

    try {
      const codeSection = await mailBody.$("//*[contains(text(),'code')]").parentElement();
      mailMessage.code = extractDigits(await codeSection.getText());
    } catch {
      console.log('Code not found!');
    }

    return mailMessage;
  }

  protected async searchAndParseMail(mailCriteria?: MailCriteria): Promise<MailMessage> {
    let mailMessage: MailMessage = {};
    await this.browser?.pause(mailCriteria?.receiveTimeout ?? this.defaultReceiveTimeout);
    await this.openInbox();
    await this.browser?.switchToFrame(await this.currentMailIframe);
    if (await this.bodyMail.isExisting()) mailMessage = await this.parseMail();
    await this.browser?.switchToParentFrame();
    return mailMessage;
  }
}

export default YopmailService;
