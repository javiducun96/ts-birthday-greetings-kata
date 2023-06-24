import { BaseMail } from "src/models/mails/BaseMail"
import { MailServiceInterface as MailService } from "../../domain/Mail/MailService"
import { MailManager } from "src/core/domain/Mail/MailManager"

export class MailHogMailService implements MailService {
  constructor(private mailManager: MailManager) {}
  async send(mail: BaseMail) {
    this.mailManager.delivery(mail)
  }
}
