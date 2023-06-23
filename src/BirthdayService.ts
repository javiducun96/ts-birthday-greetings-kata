import { Employee } from "./Employee"
import { OurDate } from "./OurDate"
import { BirthdayMail } from "./BirthdayMail"
import { getEmployeesFromFile } from "./services/getEmployeesFromFile"
import { sendMessage } from "./services/sendMessage"

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

        sendMessage(smtpHost, smtpPort, mail)
      })
  }
}
