import fs from "fs"
import path from "path"
import nodemailer from "nodemailer"
import { Employee } from "./Employee"
import { OurDate } from "./OurDate"
import Mail from "nodemailer/lib/mailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"

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
    const employeesRows = this.readEmployeesFile(fileName)
    // print all lines
    employeesRows.forEach((employeeRow) => {
      const employeeData = employeeRow.split(", ")
      const employee = new Employee(
        employeeData[EMPLOYEE_ROW.FIRST_NAME],
        employeeData[EMPLOYEE_ROW.LAST_NAME],
        employeeData[EMPLOYEE_ROW.BIRTHDAY],
        employeeData[EMPLOYEE_ROW.EMAIL]
      )
      if (employee.isBirthday(ourDate)) {
        const recipient = employee.getEmail()
        const body = "Happy Birthday, dear %NAME%!".replace(
          "%NAME%",
          employee.getFirstName()
        )
        const subject = "Happy Birthday!"
        this.sendMessage(
          smtpHost,
          smtpPort,
          "sender@here.com",
          subject,
          body,
          recipient
        )
      }
    })
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
