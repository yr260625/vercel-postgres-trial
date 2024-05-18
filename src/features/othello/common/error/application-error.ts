type ApplicationErrorType = 'FailureQueryExecution' | 'GameNotFound';

export class ApplicationError extends Error {
  constructor(readonly type: ApplicationErrorType, readonly message: string) {
    super(message);
  }
}
