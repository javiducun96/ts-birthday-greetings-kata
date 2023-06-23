import nodemailer from "nodemailer"
import { Employee } from "./Employee"
import { OurDate } from "./OurDate"
import Mail from "nodemailer/lib/mailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"
import { BirthdayMail } from "./BirthdayMail"
import { getEmployeesFromFile } from "./services/getEmployeesFromFile"

export class BirthdayService {
  sendGreetings(
    fileName: string,
    ourDate: OurDate,
    smtpHost: string,
    smtpPort: number
  ) {
    getEmployeesFromFile(fileName)
      .filter((employee: Employee) => employee.isBirthday(ourDate))
      .forEach((employee: Employee) => {
        const mail = new BirthdayMail(employee)

        this.sendMessage(
          smtpHost,
          smtpPort,
          mail.getSender(),
          mail.getSubject(),
          mail.getBody(),
          mail.getRecipient()
        )
      })
  }

  async sendMessage(
    smtpHost: string,
    smtpPort: number,
    sender: string,
    subject: string,
    body: string,
    recipient: string
  ) {
    const message = {
      host: smtpHost,
      port: smtpPort,
      from: sender,
      to: [recipient],
      subject,
      text: body,
    }

    await this.deliveryMessage(message)
  }

  protected async deliveryMessage({ host, port, ...msg }: Message) {
    const transport = nodemailer.createTransport({ host, port })

    await transport.sendMail(msg)
  }
}

export interface Message extends SMTPTransport.Options, Mail.Options {}
