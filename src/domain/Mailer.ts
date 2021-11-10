import {Email} from 'domain/Email';

export interface Mailer{
    send: (sender: string, email: Email) => Promise<void>
}
