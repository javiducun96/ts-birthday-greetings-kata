import nodemailer from "nodemailer"
import { BaseMail } from "src/models/mails/BaseMail"
import { MailManager } from "src/core/domain/Mail/MailManager"
import Mail from "nodemailer/lib/mailer"

export class NodemailerMailManager implements MailManager {
  private transport: { host: string; port: number }
  constructor(host: string, port: number) {
    this.transport = { host, port }
  }
  async delivery(mail: BaseMail) {
    const transport = nodemailer.createTransport(this.transport)
    const message: Mail.Options = {
      from: mail.getSender(),
      to: [mail.getRecipient()],
      subject: mail.getSubject(),
      text: mail.getBody(),
    }
    await transport.sendMail(message)
  }
}
