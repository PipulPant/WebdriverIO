export interface MailServiceSetProps {
  email?: string;
  reuse?: boolean;
  receiveTimeout?: number;
  useNewEmail?: boolean;
}

export interface MailMessage {
  subject?: string;
  sender?: string;
  dateTime?: string;
  text?: string;
  html?: string;
  code?: string;
}

export interface MailCriteria {
  receiveTimeout?: number;
}

export interface IMailService {
  get emailAddress(): string;
  set(setProps: MailServiceSetProps): this;
  start(): Promise<this>;
  stop(): Promise<void>;
  getMail(mailCriteria?: MailCriteria): Promise<MailMessage>;
  getCodeFromMail(mailCriteria?: MailCriteria): Promise<string | undefined>;
}
