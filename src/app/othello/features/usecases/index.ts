import { GAME_TURN, GameStatus, INIT_BOARD, Turn } from '@/app/othello/common';
import {
  canPut,
  getwalledBoard,
  getFlippablePointsAll,
  reverseStoneOnBoard,
  hasFilippablePoints,
  judgeWinner,
} from '@/app/othello/features/domains';
import { Point } from '@/app/othello/features/domains/point';
import { BoardRepostitory } from '@/app/othello/features/repositories/board-repository';
import { GameRepostitory } from '@/app/othello/features/repositories/game-repository';
import { TurnRepostitory } from '@/app/othello/features/repositories/turn-repository';

export class OthelloUsecases {
  constructor(
    private readonly gameRepo: GameRepostitory,
    private readonly boardRepo: BoardRepostitory,
    private readonly turnRepo: TurnRepostitory
  ) {}

  async gameStart() {
    const gameId = await this.gameRepo.insert();
    await Promise.all([
      this.boardRepo.insert(gameId, 0, INIT_BOARD),
      this.turnRepo.insert(gameId, 0),
    ]);
    return { gameId };
  }

  async modifyStatus(gameId: number, status: GameStatus) {
    const newStatus = await this.gameRepo.modifyState(gameId, status);
    return { status: newStatus };
  }

  async putStone(gameId: number, turnCount: number, nowTurn: Turn, point: Point) {
    // 現在の盤面を取得
    const nowBoard = await this.boardRepo.findCurrentBoardById(gameId);

    // 与えられた座標が配置可能かどうか
    if (!canPut(nowBoard, point)) {
      console.log('cannot put stone');
      throw new Error('cannot put stone');
    }

    // 反転する石があるかどうか
    const walledBoard = getwalledBoard(nowBoard);
    const flippablePoints = getFlippablePointsAll(walledBoard, nowTurn, point);
    if (flippablePoints.length === 0) {
      console.log('cannot reverse stone');
      throw new Error('cannot reverse stone');
    }

    // 反転する
    const nextBoard = reverseStoneOnBoard(nowBoard, nowTurn, point, flippablePoints);

    // DB更新
    await Promise.all([
      this.boardRepo.insert(gameId, turnCount, nextBoard),
      this.turnRepo.insert(gameId, turnCount),
    ]);

    // 次ターン
    let nextTurn = nowTurn === GAME_TURN.BLACK ? GAME_TURN.WHITE : GAME_TURN.BLACK;
    let winner = '';
    if (!hasFilippablePoints(nextBoard, nextTurn)) {
      nextTurn = nowTurn;
      if (!hasFilippablePoints(nextBoard, nowTurn)) {
        // 勝敗判定
        winner = judgeWinner(nextBoard);
      }
    }

    return { nextBoard, nextTurn, winner };
  }
}
