import { Board } from '@/app/othello/features/domains/board';
import { IDB } from '@/libs/databases/interfaces';

export class BoardRepostitory {
  constructor(private readonly db: IDB) {}

  async insert(gameId: number, turnCount: number, board: number[][]): Promise<Board> {
    const result = await this.db.execute(
      `insert into 
      othello_boards(game_id, turn_count, board_configuration) 
      values ($1, $2, $3)
      returning board_configuration`,
      [gameId, turnCount, JSON.stringify(board)]
    );

    return new Board(JSON.parse(result[0].board_configuration) as number[][]);
  }

  async findCurrentBoardById(gameId: number): Promise<Board> {
    const result = await this.db.execute(
      `select * from othello_boards where game_id=${gameId} order by turn_count desc`
    );
    return new Board(JSON.parse(result[0].board_configuration) as number[][]);
  }
}
