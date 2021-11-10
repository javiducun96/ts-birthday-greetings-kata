import {OurDate} from 'domain/OurDate'
import {EmployeeRepository} from 'domain/EmployeeRepository';
import {Employee} from 'domain/Employee';
import {Email} from 'domain/Email';
import {NodeMailer} from 'infrastucture/NodeMailer';

export class BirthdayService {
    employeeRepository: EmployeeRepository;

    constructor(employeeRepository: EmployeeRepository) {
        this.employeeRepository = employeeRepository
    }

    sendGreetings(ourDate: OurDate) {
        const birthdayEmployees = this.employeeRepository.getByBirthday(ourDate)

        const nodeMailer = new NodeMailer()
        birthdayEmployees.forEach((employee) => {
            const email = this.createEmail(employee)
            nodeMailer.send('sender@here.com', email)
        })
    }

    private createEmail(employee: Employee): Email {
        return {
            recipient: employee.getEmail(),
            body: 'Happy Birthday, dear %NAME%!'.replace('%NAME%', employee.getFirstName()),
            subject: 'Happy Birthday!'
        }
    }
}
