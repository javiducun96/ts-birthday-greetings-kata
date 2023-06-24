import { BaseMail } from "src/models/mails/BaseMail"

export interface MailManager {
  delivery(mail: BaseMail): Promise<void>
}
