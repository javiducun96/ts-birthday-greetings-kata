import { Employee } from "src/models/Employee"

export interface EmployeesRepositoryInterface {
  getEmployeesFromFile(fileName: string): Employee[]
}
