import { BaseMail } from "src/core/domain/Mail/BaseMail"

export interface MailService {
  send(mail: BaseMail): Promise<void>
}
