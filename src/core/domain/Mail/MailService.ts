import { BaseMail } from "src/core/domain/Mail/BaseMail"

export interface MailServiceInterface {
  send(mail: BaseMail): Promise<void>
}
