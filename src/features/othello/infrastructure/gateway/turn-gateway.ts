import { IDB } from '@/lib/databases/interfaces';

export class TurnGateway {
  constructor(private readonly db: IDB) {}

  async insert(gameId: number, turnCount: number): Promise<number> {
    type Row = { turn_count: number };
    const result = await this.db.execute<Row>(
      `insert into 
      othello_turns(game_id, turn_count, end_at) 
      values ($1, $2, current_timestamp)
      returning turn_count`,
      [gameId, turnCount]
    );
    return result[0].turn_count;
  }
}
