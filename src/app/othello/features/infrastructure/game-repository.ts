import { GameStatus, GameTurnVal, INIT_BOARD } from '@/app/othello/common';
import { Game } from '@/app/othello/features/domain/game';
import { IGameRepostitory } from '@/app/othello/features/domain/interfaces/game-repository';
import { BoardGateway } from '@/app/othello/features/infrastructure/gateway/board-gateway';
import { GameGateway } from '@/app/othello/features/infrastructure/gateway/game-gateway';
import { TurnGateway } from '@/app/othello/features/infrastructure/gateway/turn-gateway';
import { IDB } from '@/libs/databases/interfaces';

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
