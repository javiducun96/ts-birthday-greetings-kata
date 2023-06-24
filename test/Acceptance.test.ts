import { OurDate } from "../src/core/domain/OurDate"
import { BirthdayService } from "../src/core/services/BirthdayService"
import { deleteAllMessages, messagesSent } from "./mailhog"
import flushPromises from "flush-promises"
import { FSEmployeesRepositoy } from "../src/core/infraestructures/Employees/FSEmployeesRepository"
import { MailHogMailService } from "../src/core/infraestructures/Mail/MailHogMailService"
import { NodemailerMailManager } from "../src/core/infraestructures/Mail/NodemailerMailManager"

describe("Acceptance", () => {
  let service: BirthdayService

  beforeEach(() => {
    const SMTP_PORT = 1025
    const SMTP_URL = "127.0.0.1"

    const employeesRepository = new FSEmployeesRepositoy()
    const mailservice = new MailHogMailService(
      new NodemailerMailManager(SMTP_URL, SMTP_PORT)
    )
    service = new BirthdayService(employeesRepository, mailservice)
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
