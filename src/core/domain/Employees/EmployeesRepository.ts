import { Employee } from "src/models/Employee"

export interface EmployeesRepository {
  getFromFile(fileName: string): Employee[]
}
