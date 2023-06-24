import { Employee } from "../../models/Employee"
import { OurDate } from "../../models/OurDate"
import { BirthdayMail } from "../../models/mails/BirthdayMail"
import { EmployeesRepository } from "../domain/Employees/EmployeesRepository"
import { MailServiceInterface as MailService } from "../domain/Mail/MailService"

export class BirthdayService {
  constructor(
    private employeesRepository: EmployeesRepository,
    private mailService: MailService
  ) {}

  sendGreetings(fileName: string, ourDate: OurDate) {
    this.employeesRepository
      .getFromFile(fileName)
      .filter((employee: Employee) => employee.isBirthday(ourDate))
      .forEach((employee: Employee) => {
        this.mailService.send(new BirthdayMail(employee))
      })
  }
}
