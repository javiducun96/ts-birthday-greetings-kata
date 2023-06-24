import { OurDate } from "../src/models/OurDate"
import { BirthdayService } from "../src/BirthdayService"
import { deleteAllMessages, messagesSent } from "./mailhog"
import flushPromises from "flush-promises"
import { EmployeesRepositoryInterface } from "../src/repositories/Employees/EmployeesRepositoryInterface"
import { EmployeesRepositoy } from "../src/repositories/Employees/EmployeesRepository"

describe("Acceptance", () => {
  let service: BirthdayService
  let employeesRepository: EmployeesRepositoryInterface

  beforeEach(() => {
    employeesRepository = new EmployeesRepositoy()
    service = new BirthdayService(employeesRepository)
  })

  afterEach(async () => {
    await deleteAllMessages()
  })

  it("base scenario", async () => {
    service.sendGreetings("employee_data.txt", new OurDate("2008/10/08"))
    await flushPromises()

    const messages = await messagesSent()
    expect(messages.length).toEqual(1)
    const message = messages[0]
    expect(message.Content.Body).toEqual("Happy Birthday, dear John!")
    expect(message.Content.Headers.Subject[0]).toEqual("Happy Birthday!")
    const tos = message.Content.Headers.To
    expect(tos.length).toEqual(1)
    expect(tos[0]).toEqual("john.doe@foobar.com")
  })

  it("will not send emails when nobodys birthday", async () => {
    service.sendGreetings("employee_data.txt", new OurDate("2008/01/01"))
    await flushPromises()

    const messages = await messagesSent()
    expect(messages.length).toEqual(0)
  })
})
