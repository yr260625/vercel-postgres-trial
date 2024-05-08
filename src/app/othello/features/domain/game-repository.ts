import { GameStatus, GameTurnVal, INIT_BOARD } from '@/app/othello/common';
import { Game } from '@/app/othello/features/domain/game';
import { IGameRepostitory } from '@/app/othello/features/domain/interfaces/game-repository';
import { BoardGateway } from '@/app/othello/features/infrastructure/board-gateway';
import { GameGateway } from '@/app/othello/features/infrastructure/game-gateway';
import { TurnGateway } from '@/app/othello/features/infrastructure/turn-gateway';
import { IDB } from '@/libs/databases/interfaces';

export class GameRepostitory implements IGameRepostitory {
  constructor(private readonly db: IDB) {}

  async insert(): Promise<Game> {
    const gameGateway = new GameGateway(this.db);
    const boardGateway = new BoardGateway(this.db);
    const turnGateway = new TurnGateway(this.db);
    const gameId = await gameGateway.insert();
    await Promise.all([
      boardGateway.insert(gameId, 0, INIT_BOARD),
      turnGateway.insert(gameId, 0),
    ]);
    return new Game(gameId, '対戦中');
  }

  async modifyStatus(game: Game): Promise<Game> {
    const gameGateway = new GameGateway(this.db);
    const newStatus = await gameGateway.modifyStatus(game.id, game.status);
    return new Game(game.id, newStatus);
  }
}
