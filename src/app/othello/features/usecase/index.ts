import { ResponseBody } from '@/app/api/othello/board/route';
import { GameTurnVal, GameStatus, INIT_BOARD } from '@/app/othello/common';
import { Game } from '@/app/othello/features/domain/game';
import { IGameRepostitory } from '@/app/othello/features/domain/interfaces/game-repository';
import { ITurnRepostitory } from '@/app/othello/features/domain/interfaces/turn-repository';
import { Turn } from '@/app/othello/features/domain/turn';

export class OthelloUsecases {
  constructor(
    private readonly gameRepo: IGameRepostitory,
    private readonly turnRepo: ITurnRepostitory
  ) {}

  /**
   * 対戦開始
   * @returns Promise<number>
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
   * @param gameId
   * @param turnCount
   * @param nowTurnVal
   * @param point
   * @returns
   */
  async putStone(
    gameId: number,
    turnCount: number,
    nowTurnVal: GameTurnVal,
    x: number,
    y: number
  ): Promise<ResponseBody> {
    // 現在ターンの盤面を取得
    const currentTurn = await this.turnRepo.findCurrentTurn(
      gameId,
      turnCount,
      nowTurnVal,
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