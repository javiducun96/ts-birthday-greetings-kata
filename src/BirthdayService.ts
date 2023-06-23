import fs from "fs"
import path from "path"
import nodemailer from "nodemailer"
import { Employee } from "./Employee"
import { OurDate } from "./OurDate"
import Mail from "nodemailer/lib/mailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"
import { BirthdayMail } from "./BirthdayMail"

enum EMPLOYEE_ROW {
  LAST_NAME = 0,
  FIRST_NAME = 1,
  BIRTHDAY = 2,
  EMAIL = 3,
}

export class BirthdayService {
  sendGreetings(
    fileName: string,
    ourDate: OurDate,
    smtpHost: string,
    smtpPort: number
  ) {
    this.readEmployeesFile(fileName)
      .map(this.mapEmployeeFromRow)
      .filter((employee) => employee.isBirthday(ourDate))
      .forEach((employee) => {
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

  mapEmployeeFromRow(row: string): Employee {
    const employeeData = row.split(", ")
    return new Employee(
      employeeData[EMPLOYEE_ROW.FIRST_NAME],
      employeeData[EMPLOYEE_ROW.LAST_NAME],
      employeeData[EMPLOYEE_ROW.BIRTHDAY],
      employeeData[EMPLOYEE_ROW.EMAIL]
    )
  }

  readEmployeesFile(fileName: string): string[] {
    const data = fs.readFileSync(
      path.resolve(__dirname, `../resources/${fileName}`),
      "UTF-8"
    )
    // split the contents by new line
    const employeesRows = data.split(/\r?\n/)
    employeesRows.shift()
    return employeesRows
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

  // made protected for testing :-(
  protected async deliveryMessage({ host, port, ...msg }: Message) {
    const transport = nodemailer.createTransport({ host, port })

    await transport.sendMail(msg)
  }
}

export interface Message extends SMTPTransport.Options, Mail.Options {}
