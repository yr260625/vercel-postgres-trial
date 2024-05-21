import { IGameRepostitory } from '@/features/othello/domain/interfaces/game-repository';

export class StartGameUsecase {
  constructor(private readonly gameRepo: IGameRepostitory) {}

  /**
   * 対戦開始
   * @returns Promise<{gameId: number}>
   */
  async run() {
    const game = await this.gameRepo.insert();
    return { gameId: game.id };
  }
}
