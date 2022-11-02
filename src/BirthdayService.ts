import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'
import {Employee} from './Employee'
import {OurDate} from './OurDate'
import Mail from 'nodemailer/lib/mailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

export class BirthdayService {
    sendGreetings(ourDate: OurDate) {
        const employees: Employee[] = this.getEmployees()

        const birthdayEmployees = employees.filter(employee => employee.isBirthday(ourDate))

        birthdayEmployees.forEach(employee => {
            const email = this.createEmail(employee)
            this.sendMessage('sender@here.com', email)
        })
    }

    private getEmployees(): Employee[] {
        const data = fs.readFileSync(path.resolve(__dirname, `../resources/employee_data.txt`), 'UTF-8')

        // split the contents by new line
        const lines = data.split(/\r?\n/)
        lines.shift()

        const employees: Employee[] = lines.map(line => {
            const employeeData = line.split(', ')

            return new Employee(employeeData[1], employeeData[0], employeeData[2], employeeData[3])
        })


        return employees
    }

    private createEmail(employee: Employee): Email {
        const email: Email = {
            subject: 'Happy Birthday!',
            body: 'Happy Birthday, dear %NAME%!'.replace('%NAME%',
                employee.getFirstName()),
            recipient: employee.getEmail()
        }

        return email
    }

    private async sendMessage(sender: string, email: Email) {
        const SMTP_PORT = 1025
        const SMTP_URL = '127.0.0.1'

        const message = {
            host: SMTP_URL,
            port: SMTP_PORT,
            from: sender,
            to: [email.recipient],
            subject: email.subject,
            text: email.body
        }

        this.deliveryMessage(message)
    }

    // made protected for testing :-(
    private async deliveryMessage({host, port, ...msg}: Message) {
        const transport = nodemailer.createTransport({host, port})

        await transport.sendMail(msg)
    }
}

interface Email {
    recipient: string
    body: string
    subject: string
}

export interface Message extends SMTPTransport.Options, Mail.Options {
}