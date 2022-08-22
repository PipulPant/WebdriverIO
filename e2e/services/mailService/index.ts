import BaseMailService from './base';
import { MailCriteria, MailMessage, IMailService, MailServiceSetProps } from './types';
import YopmailService from './yopmailService';

export class MailService implements IMailService {
  private service: BaseMailService;

  constructor(service: BaseMailService) {
    this.service = service;
  }

  public get emailAddress(): string {
    return this.service.emailAddress;
  }

  public set(setProps: MailServiceSetProps): this {
    this.service.set(setProps);
    return this;
  }

  public async start(): Promise<this> {
    await this.service.start();
    return this;
  }

  public stop(): Promise<void> {
    return this.service.stop();
  }

  public getMail(mailCriteria?: MailCriteria): Promise<MailMessage> {
    return this.service.getMail(mailCriteria);
  }

  public getCodeFromMail(mailCriteria?: MailCriteria): Promise<string | undefined> {
    return this.service.getCodeFromMail(mailCriteria);
  }
}

/** Use Yopmail Service as default. */
export default new MailService(new YopmailService());
