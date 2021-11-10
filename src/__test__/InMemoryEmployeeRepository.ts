import {OurDate} from "domain/OurDate"
import {Employee} from "domain/Employee"
import {EmployeeRepository} from 'domain/EmployeeRepository';

export class InMemoryEmployeeRepository implements EmployeeRepository {
    private employees: Employee[] = [
        new Employee('John', 'Doe', '1982/10/08', 'john.doe@foobar.com'),
        new Employee('Mary', 'Ann', '1975/03/11', 'mary.ann@foobar.com')]

    getByBirthday(ourDate: OurDate): Employee[] {
        return this.employees.filter(employee => employee.isBirthday(ourDate))
    }
}
