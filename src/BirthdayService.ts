import { Employee } from "./models/Employee"
import { OurDate } from "./models/OurDate"
import { BirthdayMail } from "./models/mails/BirthdayMail"
import { sendMessage } from "./services/sendMessage"
import { EmployeesRepositoy } from "./repositories/Employees/EmployeesRepository"

export class BirthdayService {
  sendGreetings(fileName: string, ourDate: OurDate) {
    const employeesRepository = new EmployeesRepositoy()
    employeesRepository
      .getEmployeesFromFile(fileName)
      .filter((employee: Employee) => employee.isBirthday(ourDate))
      .forEach((employee: Employee) => {
        sendMessage(new BirthdayMail(employee))
      })
  }
}
