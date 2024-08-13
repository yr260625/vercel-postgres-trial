import { ResponseBody } from '@/app/api/othello/board/route';
import { GameTurnVal } from '@/features/othello/common';
import { ITurnRepostitory } from '@/features/othello/domain/interfaces/turn-repository';

export class PlaySoloGame {
  constructor(private readonly turnRepo: ITurnRepostitory) {}

  /**
   * 盤面に石を置く
   *
   * @async
   * @param {number} gameId
   * @param {GameTurnVal} nowTurnVal
   * @param {number} nowTurnCount
   * @param {number} x
   * @param {number} y
   * @returns {Promise<ResponseBody>}
   */
  async run(
    gameId: number,
    nowTurnVal: GameTurnVal,
    nowTurnCount: number,
    x: number,
    y: number
  ): Promise<ResponseBody> {
    // 現在ターンの盤面を取得
    const currentTurn = await this.turnRepo.findCurrentTurn(
      gameId,
      nowTurnVal,
      nowTurnCount,
      x,
      y
    );

    // 次ターンの開始盤面を取得
    const nextTurn = currentTurn.createNextTurn();

    // DB更新
    await this.turnRepo.save(nextTurn);

    // 勝者取得
    const winner = nextTurn.judgeWinner();

    return {
      nextBoard: nextTurn.board.cells,
      nextTurnVal: nextTurn.turnVal,
      nextTurnCount: nextTurn.turnCount,
      winner,
    };
  }
}
