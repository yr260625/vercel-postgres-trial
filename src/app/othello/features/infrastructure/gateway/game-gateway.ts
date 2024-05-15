import { GameStatus } from '@/app/othello/common';
import { IDB } from '@/libs/databases/interfaces';

export class GameGateway {
  constructor(private readonly db: IDB) {}

  async insert(): Promise<number> {
    const result = await this.db.execute(`insert into 
      othello_games(status, created_at) 
      values ('対戦中', current_timestamp)
      returning id
    `);

    return result[0].id as number;
  }

  async modifyStatus(gameId: number, status: GameStatus): Promise<GameStatus> {
    const result = await this.db.execute(
      `update othello_games
        set status=$1
        where id=$2
      returning status
    `,
      [status, gameId]
    );
    return result[0].status as GameStatus;
  }
}
