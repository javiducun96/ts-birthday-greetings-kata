import { BaseMail } from "src/core/domain/Mail/BaseMail"

export interface MailManager {
  delivery(mail: BaseMail): Promise<void>
}
