import { ResponseBody } from '@/app/api/othello/board/route';
import { GameStatus, GameTurnVal } from '@/features/othello/common';
import { Api } from '@/libs/api/axios-config';

export class OthelloController {
  /**
   * 対戦開始
   * @returns
   */
  async start(): Promise<{ gameId: number }> {
    console.log('game start!!!!');
    const response = await Api.post<{ gameId: number }>('/api/othello');
    return response.data;
  }

  /**
   * 中断
   * @returns
   */
  async changeStatus(gameId: number, status: GameStatus) {
    console.log('pause!!!!');
    const response = await Api.put<{ status: GameStatus }>(`/api/othello/${gameId}`, {
      status,
    });
    return response.data;
  }

  async putStone(
    gameId: number,
    nowTurnVal: GameTurnVal,
    nowTurnCount: number,
    x: number,
    y: number
  ) {
    console.log('put stone!!!');
    const response = await Api.post<ResponseBody>(`/api/othello/board`, {
      gameId,
      nowTurnVal,
      nowTurnCount,
      x,
      y,
    });
    return response.data;
  }
}
