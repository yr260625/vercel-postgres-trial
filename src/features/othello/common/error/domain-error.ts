type DomainErrorType = 'ClickedPointIsNotEmpty' | 'UnexpectedValue';

export class DomainError extends Error {
  constructor(readonly type: DomainErrorType, readonly message: string) {
    super(message);
  }
}
