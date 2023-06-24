export class BaseMail {
  constructor(
    private _sender: string,
    private _recipient: string,
    private _subject: string,
    private _body: string
  ) {}

  getSender() {
    return this._sender
  }

  getRecipient() {
    return this._recipient
  }

  getBody() {
    return this._body
  }
  getSubject() {
    return this._subject
  }
}
