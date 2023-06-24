import { BaseMail } from "./BaseMail"
import { Employee } from "./Employee"

export class BirthdayMail extends BaseMail {
  constructor(employee: Employee) {
    const sender = "sender@here.com"
    const recipient = employee.getEmail()
    const subject = "Happy Birthday!"
    const body = "Happy Birthday, dear %NAME%!".replace(
      "%NAME%",
      employee.getFirstName()
    )
    super(sender, recipient, subject, body)
  }
}
