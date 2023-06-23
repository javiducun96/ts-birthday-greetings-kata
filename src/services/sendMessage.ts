import Mail from "nodemailer/lib/mailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"
import nodemailer from "nodemailer"
import { BirthdayMail } from "src/BirthdayMail"

const deliveryMessage = async ({ host, port, ...msg }: Message) => {
  const transport = nodemailer.createTransport({ host, port })
  await transport.sendMail(msg)
}

export const sendMessage = async (
  smtpHost: string,
  smtpPort: number,
  mail: BirthdayMail
) => {
  const message = {
    host: smtpHost,
    port: smtpPort,
    from: mail.getSender(),
    to: [mail.getRecipient()],
    subject: mail.getSubject(),
    text: mail.getBody(),
  }

  await deliveryMessage(message)
}

export interface Message extends SMTPTransport.Options, Mail.Options {}
