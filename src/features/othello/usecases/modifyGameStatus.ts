import { GameStatus } from '@/features/othello/common';
import { Game } from '@/features/othello/domain/game';
import { IGameRepostitory } from '@/features/othello/domain/interfaces/game-repository';

export class ModifyGameStatus {
  constructor(private readonly gameRepo: IGameRepostitory) {}

  /**
   * 対戦中断、対戦再開
   * @param gameId
   * @param status
   * @returns Promise<{status: GameStatus}>
   */
  async run(gameId: number, status: GameStatus) {
    const game = new Game(gameId, status);
    const newGame = await this.gameRepo.modifyStatus(game);
    return { status: newGame.status };
  }
}
