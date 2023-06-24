import { Employee } from "./models/Employee"
import { OurDate } from "./models/OurDate"
import { BirthdayMail } from "./models/mails/BirthdayMail"
import { sendMessage } from "./services/sendMessage"
import { EmployeesRepositoryInterface } from "./repositories/Employees/EmployeesRepositoryInterface"

export class BirthdayService {
  constructor(private employeesRepository: EmployeesRepositoryInterface) {}
  sendGreetings(fileName: string, ourDate: OurDate) {
    this.employeesRepository
      .getEmployeesFromFile(fileName)
      .filter((employee: Employee) => employee.isBirthday(ourDate))
      .forEach((employee: Employee) => {
        sendMessage(new BirthdayMail(employee))
      })
  }
}
