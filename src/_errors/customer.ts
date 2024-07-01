export class CustomBadRequestError extends Error {
  statusCode: number
  errors: string[]

  constructor(
    message: string,
    statusCode: number = 500,
    errors: string[] = [],
  ) {
    super(message)
    this.statusCode = statusCode
    this.errors = errors

    Object.setPrototypeOf(this, CustomBadRequestError.prototype)
  }

  serializeErrors() {
    return this.errors.length > 0 ? this.errors : [{ message: this.message }]
  }
}
