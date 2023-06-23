import { Employee } from "./Employee"

export class BirthdayMail {
  private _sender: string
  private _recipient: string
  private _body: string
  private _subject: string

  constructor(employee: Employee) {
    this._sender = "sender@here.com"
    this._recipient = employee.getEmail()
    this._subject = "Happy Birthday!"
    this._body = "Happy Birthday, dear %NAME%!".replace(
      "%NAME%",
      employee.getFirstName()
    )
  }

  getSender() {
    return this._sender
  }

  getRecipient() {
    return this._recipient
  }

  getBody() {
    return this._body
  }
  getSubject() {
    return this._subject
  }
}
