import {OurDate} from 'domain/OurDate'
import {EmployeeRepository} from 'domain/EmployeeRepository';
import {Employee} from 'domain/Employee';
import {Email} from 'domain/Email';
import {Mailer} from 'domain/Mailer';


export class BirthdayService {
    employeeRepository: EmployeeRepository;
    mailer: Mailer;

    constructor(employeeRepository: EmployeeRepository, mailer: Mailer) {
        this.employeeRepository = employeeRepository
        this.mailer = mailer
    }

    sendGreetings(ourDate: OurDate) {
        const birthdayEmployees = this.employeeRepository.getByBirthday(ourDate)


        birthdayEmployees.forEach((employee) => {
            const email = this.createEmail(employee)
            this.mailer.send('sender@here.com', email)
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
