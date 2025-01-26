// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

interface Error {
  status: number;
  error: string;
}

export default class Errors {
  static HandleError(error: string, statusCode: number): Error {
    const message: Error = {
      status: statusCode,
      error,
    };

    return message;
  }
}
