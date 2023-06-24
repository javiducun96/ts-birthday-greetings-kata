import { Employee } from "src/core/domain/Employees/Employee"

export interface EmployeesRepository {
  getFromFile(fileName: string): Employee[]
}
