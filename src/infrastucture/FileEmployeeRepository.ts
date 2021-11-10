import fs from 'fs';
import path from 'path';
import {Employee} from 'domain/Employee';
import {OurDate} from 'domain/OurDate';
import {EmployeeRepository} from 'domain/EmployeeRepository';

export class FileEmployeeRepository implements EmployeeRepository{
    getByBirthday(ourDate: OurDate) {
        // get employees from file
        const data = fs.readFileSync(path.resolve(__dirname, './_resources/employee_data.txt'), 'UTF-8')
        const lines = data.split(/\r?\n/)
        lines.shift()
        const employees = lines.map(line => {
            const employeeData = line.split(', ')
            return new Employee(employeeData[1], employeeData[0], employeeData[2], employeeData[3])
        })

        // filter employees
        return employees.filter(employee => employee.isBirthday(ourDate))
    }

}
