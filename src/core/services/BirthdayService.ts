import { Employee } from "../domain/Employees/Employee"
import { OurDate } from "../domain/OurDate"
import { BirthdayMail } from "../domain/Mail/BirthdayMail"
import { EmployeesRepository } from "../domain/Employees/EmployeesRepository"
import { MailServiceInterface as MailService } from "../domain/Mail/MailService"

export class BirthdayService {
  constructor(
    private employeesRepository: EmployeesRepository,
    private mailService: MailService
  ) {}

  sendGreetings(fileName: string, ourDate: OurDate) {
    const employees = this.employeesRepository.getFromFile(fileName)

    employees
      .filter((employee: Employee) => employee.isBirthday(ourDate))
      .forEach((employee: Employee) => {
        this.mailService.send(new BirthdayMail(employee))
      })
  }
}
