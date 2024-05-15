import { GameTurnVal } from '@/app/othello/common';
import { Board } from '@/app/othello/features/domain/board';
import { Point } from '@/app/othello/features/domain/point';
import { Turn } from '@/app/othello/features/domain/turn';
import { IDB } from '@/libs/databases/interfaces';

export class TurnGateway {
  constructor(private readonly db: IDB) {}

  async insert(gameId: number, turnCount: number): Promise<number> {
    const result = await this.db.execute(
      `insert into 
      othello_turns(game_id, turn_count, end_at) 
      values ($1, $2, current_timestamp)
      returning turn_count`,
      [gameId, turnCount]
    );
    return result[0].turn_count as number;
  }
}
