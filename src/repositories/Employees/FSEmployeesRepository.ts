import { EmployeesRepositoryInterface as EmployeesRepository } from "./EmployeesRepository"

import fs from "fs"
import path from "path"
import { Employee } from "../../models/Employee"

enum EMPLOYEE_ROW {
  LAST_NAME = 0,
  FIRST_NAME = 1,
  BIRTHDAY = 2,
  EMAIL = 3,
}

const mapEmployeeFromRow = (row: string): Employee => {
  const employeeData = row.split(", ")
  return new Employee(
    employeeData[EMPLOYEE_ROW.FIRST_NAME],
    employeeData[EMPLOYEE_ROW.LAST_NAME],
    employeeData[EMPLOYEE_ROW.BIRTHDAY],
    employeeData[EMPLOYEE_ROW.EMAIL]
  )
}

const readFile = (fileName: string) => {
  const data = fs.readFileSync(
    path.resolve(__dirname, `../../../resources/${fileName}`),
    "UTF-8"
  )
  const employeesRows = data.split(/\r?\n/)
  employeesRows.shift()
  return employeesRows
}

export class FSEmployeesRepositoy implements EmployeesRepository {
  getFromFile(fileName: string): Employee[] {
    const employeesRows = readFile(fileName)
    return employeesRows.map(mapEmployeeFromRow)
  }
}
