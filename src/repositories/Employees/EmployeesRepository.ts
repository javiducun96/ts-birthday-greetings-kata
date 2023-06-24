import { Employee } from "src/models/Employee"

export interface EmployeesRepositoryInterface {
  getFromFile(fileName: string): Employee[]
}
