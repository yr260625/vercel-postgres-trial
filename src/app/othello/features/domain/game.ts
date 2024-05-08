import { GameStatus } from '@/app/othello/common';

export class Game {
  readonly id: number;
  readonly status: GameStatus;
  constructor(id: number, status: GameStatus) {
    this.validation(id, status);
    this.id = id;
    this.status = status;
  }

  private validation(id: number, status: GameStatus) {
    if (id === null || undefined) throw new Error('The field is required');
    if (status === null || undefined) throw new Error('The field is required');
    return;
  }
}
