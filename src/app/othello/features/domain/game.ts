import { GameStatus } from '@/app/othello/common';
import { DomainError } from '@/app/othello/common/error/domain-error';

export class Game {
  readonly id: number;
  readonly status: GameStatus;
  constructor(id: number, status: GameStatus) {
    this.validation(id, status);
    this.id = id;
    this.status = status;
  }

  private validation(id: number, status: GameStatus) {
    if (id === null || undefined)
      throw new DomainError('UnexpectedValue', 'The "id" is required');
    if (status === null || undefined)
      throw new DomainError('UnexpectedValue', 'The "status" is required');
    return;
  }
}
