import {OurDate} from './OurDate';
import {Employee} from './Employee';

export interface EmployeeRepository {
    getByBirthday: (ourDate: OurDate) => Employee[]
}
