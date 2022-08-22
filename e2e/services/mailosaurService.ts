import Mailosaur from 'mailosaur';
import { Message } from 'mailosaur/lib/models';

class MailosaurService {
  private readonly mailClient = new Mailosaur(process.env.MAILOSAUR_API_KEY ?? '');

  private readonly mailsaurConfig = {
    serverId: process.env.MAILOSAUR_SERVER_ID ?? '',
    serverDomain: `${process.env.MAILOSAUR_SERVER_ID}.mailosaur.net`,
    email: `e2e_${new Date().getTime()}@${process.env.MAILOSAUR_SERVER_ID}.mailosaur.net`,
  };

  public get emailAddress(): string {
    return this.mailsaurConfig.email;
  }

  public async findEmail(subject?: string): Promise<Message> {
    const searchCriteria = {
      sentTo: this.emailAddress,
      subject,
    };

    return this.mailClient.messages.get(this.mailsaurConfig.serverId, searchCriteria);
  }

  public async findVerificationCode(subject?: string): Promise<string | null> {
    const message = await this.findEmail(subject);
    const verificationCodes = message.html?.codes;
    if (!verificationCodes) return null;
    const verificationCode = verificationCodes.find(code => /^\d+$/.test(code.value ?? ''));
    return verificationCode?.value ?? null;
  }
}

export default new MailosaurService();
