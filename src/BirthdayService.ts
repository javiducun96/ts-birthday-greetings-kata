import { Employee } from "./Employee"
import { OurDate } from "./OurDate"
import { BirthdayMail } from "./entities/mails/BirthdayMail"
import { getEmployeesFromFile } from "./services/getEmployeesFromFile"
import { sendMessage } from "./services/sendMessage"

export class BirthdayService {
  sendGreetings(fileName: string, ourDate: OurDate) {
    getEmployeesFromFile(fileName)
      .filter((employee: Employee) => employee.isBirthday(ourDate))
      .forEach((employee: Employee) => {
        sendMessage(new BirthdayMail(employee))
      })
  }
}
