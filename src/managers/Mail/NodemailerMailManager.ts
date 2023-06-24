import nodemailer from "nodemailer"
import { BaseMail } from "src/models/mails/BaseMail"
import { MailManager } from "./MailManager"

export class NodemailerMailManager implements MailManager {
  private transport: { host: string; port: number }
  constructor(host: string, port: number) {
    this.transport = { host, port }
  }
  async delivery(mail: BaseMail) {
    const transport = nodemailer.createTransport(this.transport)
    const message = {
      from: mail.getSender(),
      to: [mail.getRecipient()],
      subject: mail.getSubject(),
      text: mail.getBody(),
    }
    await transport.sendMail(message)
  }
}
