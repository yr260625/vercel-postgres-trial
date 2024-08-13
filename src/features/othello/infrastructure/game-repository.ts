import { INIT_BOARD } from '@/features/othello/common';
import { Game } from '@/features/othello/domain/game';
import { IGameRepostitory } from '@/features/othello/domain/interfaces/game-repository';
import { BoardGateway } from '@/features/othello/infrastructure/gateway/board-gateway';
import { GameGateway } from '@/features/othello/infrastructure/gateway/game-gateway';
import { TurnGateway } from '@/features/othello/infrastructure/gateway/turn-gateway';

import { IDB } from '@/lib/databases/interfaces';

export class GameRepostitory implements IGameRepostitory {
  private gameGateway = new GameGateway(this.db);
  private boardGateway = new BoardGateway(this.db);
  private turnGateway = new TurnGateway(this.db);
  constructor(private readonly db: IDB) {}

  async insert(): Promise<Game> {
    const gameId = await this.gameGateway.insert();
    await Promise.all([
      this.boardGateway.insert(gameId, 0, INIT_BOARD),
      this.turnGateway.insert(gameId, 0),
    ]);
    return new Game(gameId, '対戦中');
  }

  async modifyStatus(game: Game): Promise<Game> {
    const newStatus = await this.gameGateway.modifyStatus(game.id, game.status);
    return new Game(game.id, newStatus);
  }
}
