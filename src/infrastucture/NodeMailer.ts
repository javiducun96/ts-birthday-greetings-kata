import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Mail from 'nodemailer/lib/mailer';
import {Email} from 'domain/Email';

export interface Message extends SMTPTransport.Options, Mail.Options {
}

export class NodeMailer {
    async send(sender: string, email: Email) {
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
