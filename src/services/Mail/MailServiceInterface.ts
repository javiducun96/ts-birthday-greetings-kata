import { BaseMail } from "src/models/mails/BaseMail"

export interface MailServiceInterface {
  send(mail: BaseMail): Promise<void>
}
