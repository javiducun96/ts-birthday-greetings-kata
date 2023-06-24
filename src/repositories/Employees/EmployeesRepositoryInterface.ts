import { Employee } from "src/entities/mails/Employee"

export interface EmployeesRepositoryInterface {
  getEmployeesFromFile(fileName: string): Employee[]
}
