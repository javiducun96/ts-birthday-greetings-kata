import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import {OurDate} from 'domain/OurDate'
import {EmployeeRepository} from 'domain/EmployeeRepository';
import {Employee} from 'domain/Employee';

export class BirthdayService {
    employeeRepository: EmployeeRepository;

    constructor(employeeRepository: EmployeeRepository) {
        this.employeeRepository = employeeRepository
    }

    sendGreetings(ourDate: OurDate) {
        const birthdayEmployees = this.employeeRepository.getByBirthday(ourDate)

        birthdayEmployees.forEach((employee) => {
            const email = this.createEmail(employee)
            this.sendEmail('sender@here.com', email)
        })
    }

    private createEmail(employee: Employee): Email {
        return {
            recipient: employee.getEmail(),
            body: 'Happy Birthday, dear %NAME%!'.replace('%NAME%', employee.getFirstName()),
            subject: 'Happy Birthday!'
        }
    }

    private async sendEmail(sender: string, email: Email) {
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

    private async deliveryMessage({host, port, ...msg}: Message) {
        const transport = nodemailer.createTransport({host, port})

        await transport.sendMail(msg)
    }
}

interface Email {
    subject: string
    body: string
    recipient: string
}

export interface Message extends SMTPTransport.Options, Mail.Options {
}

