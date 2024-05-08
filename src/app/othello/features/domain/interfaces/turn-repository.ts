import { GameTurnVal } from '@/app/othello/common';
import { Turn } from '@/app/othello/features/domain/turn';

export interface ITurnRepostitory {
  insert(gameId: number, turnCount: number): Promise<number>;
  findCurrentTurn(
    gameId: number,
    nowTurnVal: GameTurnVal,
    nowTurnCount: number,
    x: number,
    y: number
  ): Promise<Turn>;
  save(turn: Turn): Promise<void>;
}
