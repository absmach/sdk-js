interface Error {
  status: number
  error: string
}

export default class Errors {
  HandleError (error: string, statusCode: number): Error {
    const message: Error = {
      status: statusCode,
      error
    }

    return message
  }
}
