import { ResponseBody } from '@/app/api/othello/board/route';
import { GameStatus, GameTurnVal } from '@/features/othello/common';
import { Game } from '@/features/othello/domain/game';
import { IGameRepostitory } from '@/features/othello/domain/interfaces/game-repository';
import { ITurnRepostitory } from '@/features/othello/domain/interfaces/turn-repository';
import { Turn } from '@/features/othello/domain/turn';

export class OthelloUsecases {
  constructor(
    private readonly gameRepo: IGameRepostitory,
    private readonly turnRepo: ITurnRepostitory
  ) {}

  /**
   * 対戦開始
   * @returns Promise<{gameId: number}>
   */
  async gameStart() {
    const game = await this.gameRepo.insert();
    return { gameId: game.id };
  }

  /**
   * 対戦中断、対戦再開
   * @param gameId
   * @param status
   * @returns Promise<{status: GameStatus}>
   */
  async modifyStatus(gameId: number, status: GameStatus) {
    const game = new Game(gameId, status);
    const newGame = await this.gameRepo.modifyStatus(game);
    return { status: newGame.status };
  }

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
  async putStone(
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
    const nextTurn = Turn.nextTurn(currentTurn);

    // DB更新
    this.turnRepo.save(nextTurn);

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
