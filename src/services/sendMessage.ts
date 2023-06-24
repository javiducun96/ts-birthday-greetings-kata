import Mail from "nodemailer/lib/mailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"
import nodemailer from "nodemailer"
import { BaseMail } from "src/models/mails/BaseMail"

const SMTP_PORT = 1025
const SMTP_URL = "127.0.0.1"

const deliveryMessage = async ({ host, port, ...msg }: Message) => {
  const transport = nodemailer.createTransport({ host, port })
  await transport.sendMail(msg)
}

export const sendMessage = async (mail: BaseMail) => {
  const message = {
    host: SMTP_URL,
    port: SMTP_PORT,
    from: mail.getSender(),
    to: [mail.getRecipient()],
    subject: mail.getSubject(),
    text: mail.getBody(),
  }

  await deliveryMessage(message)
}

export interface Message extends SMTPTransport.Options, Mail.Options {}
