interface Cause {
    status: number;
    message: string;
}

export class MyError extends Error {
    cause: Cause | undefined;
  constructor(message: string, cause?: Cause) {
    super(message);
    this.cause = cause;
  }
}