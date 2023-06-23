import { Employee } from "./Employee"

export class BirthdayMail {
  private _recipient: string
  private _body: string
  private _subject: string

  constructor(employee: Employee) {
    this._recipient = employee.getEmail()

    this._body = "Happy Birthday, dear %NAME%!".replace(
      "%NAME%",
      employee.getFirstName()
    )
    this._subject = "Happy Birthday!"
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
