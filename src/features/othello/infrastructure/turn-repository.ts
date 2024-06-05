import { GameTurnVal } from '@/features/othello/common';
import { Board } from '@/features/othello/domain/board';
import { Game } from '@/features/othello/domain/game';
import { ITurnRepostitory } from '@/features/othello/domain/interfaces/turn-repository';
import { Point } from '@/features/othello/domain/point';
import { Turn } from '@/features/othello/domain/turn';
import { BoardGateway } from '@/features/othello/infrastructure/gateway/board-gateway';
import { TurnGateway } from '@/features/othello/infrastructure/gateway/turn-gateway';
import { IDB } from '@/lib/databases/interfaces';

export class TurnRepostitory implements ITurnRepostitory {
  private turnGateway = new TurnGateway(this.db);
  private boardGateway = new BoardGateway(this.db);
  constructor(private readonly db: IDB) {}

  async insert(gameId: number, turnCount: number): Promise<number> {
    const nextTurnCount = await this.turnGateway.insert(gameId, turnCount);
    return nextTurnCount;
  }

  async findCurrentTurn(
    gameId: number,
    nowTurnVal: GameTurnVal,
    nowTurnCount: number,
    x: number,
    y: number
  ): Promise<Turn> {
    const cells = await this.boardGateway.findCurrentBoardById(gameId);
    return new Turn(
      nowTurnVal,
      nowTurnCount,
      new Game(gameId, '対戦中'),
      new Point(x, y),
      new Board(cells)
    );
  }

  async save(turn: Turn): Promise<void> {
    await Promise.all([
      this.boardGateway.insert(turn.game.id, turn.turnCount, turn.board.cells),
      this.turnGateway.insert(turn.game.id, turn.turnCount),
    ]);
  }
}
