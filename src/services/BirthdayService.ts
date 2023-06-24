import { Employee } from "../models/Employee"
import { OurDate } from "../models/OurDate"
import { BirthdayMail } from "../models/mails/BirthdayMail"
import { EmployeesRepositoryInterface } from "../repositories/Employees/EmployeesRepositoryInterface"
import { MailServiceInterface } from "./Mail/MailServiceInterface"

export class BirthdayService {
  constructor(
    private employeesRepository: EmployeesRepositoryInterface,
    private mailService: MailServiceInterface
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
