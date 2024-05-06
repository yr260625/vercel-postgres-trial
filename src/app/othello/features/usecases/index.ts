import { ResponseBody } from '@/app/api/othello/board/route';
import { GameTurnVal, GameStatus, INIT_BOARD } from '@/app/othello/common';
import { Point } from '@/app/othello/features/domains/point';
import { Turn } from '@/app/othello/features/domains/turn';
import { BoardRepostitory } from '@/app/othello/features/repositories/board-repository';
import { GameRepostitory } from '@/app/othello/features/repositories/game-repository';
import { TurnRepostitory } from '@/app/othello/features/repositories/turn-repository';

export class OthelloUsecases {
  constructor(
    private readonly gameRepo: GameRepostitory,
    private readonly boardRepo: BoardRepostitory,
    private readonly turnRepo: TurnRepostitory
  ) {}

  /**
   * 対戦開始
   * @returns Promise<number>
   */
  async gameStart() {
    const gameId = await this.gameRepo.insert();
    await Promise.all([
      this.boardRepo.insert(gameId, 0, INIT_BOARD),
      this.turnRepo.insert(gameId, 0),
    ]);
    return { gameId };
  }

  /**
   * 対戦中断、対戦再開
   * @param gameId
   * @param status
   * @returns Promise<{status: GameStatus}>
   */
  async modifyStatus(gameId: number, status: GameStatus) {
    const newStatus = await this.gameRepo.modifyState(gameId, status);
    return { status: newStatus };
  }

  /**
   * 盤面に石を置く
   * @param gameId
   * @param turnCount
   * @param nowTurn
   * @param point
   * @returns
   */
  async putStone(
    gameId: number,
    turnCount: number,
    nowTurnVal: GameTurnVal,
    point: Point
  ): Promise<ResponseBody> {
    // 現在の盤面を取得
    const nowBoard = await this.boardRepo.findCurrentBoardById(gameId);
    const nowTurn = new Turn(nowTurnVal, point, nowBoard);

    // 石を置く
    nowTurn.putStone(point);

    // 石を反転する
    nowTurn.reverseStone(point);

    // 次ターン
    const nextTurn = nowTurn.rotate();

    // 勝者取得
    const winner = nowTurn.judgeWinner();

    // 変種後の盤面を取得
    const nextBoard = nowTurn.getBoard();

    // DB更新
    await Promise.all([
      this.boardRepo.insert(gameId, turnCount, nextBoard.cells),
      this.turnRepo.insert(gameId, turnCount),
    ]);

    return { nextBoard: nextBoard.cells, nextTurn, winner };
  }
}
