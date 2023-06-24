import { BaseMail } from "src/models/mails/BaseMail"
import { MailServiceInterface as MailService } from "./MailService"
import { MailManager } from "src/managers/Mail/MailManager"

export class MailHogMailService implements MailService {
  constructor(private mailManager: MailManager) {}
  async send(mail: BaseMail) {
    this.mailManager.delivery(mail)
  }
}
