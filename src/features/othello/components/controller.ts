import { ChangeGameStatusResponse } from '@/app/api/othello/[id]/route';
import { ResponseBody } from '@/app/api/othello/board/route';
import { StartGameResponse } from '@/app/api/othello/route';
import { GameStatus, GameTurnVal } from '@/features/othello/common';
import { Api } from '@/lib/api/axios-config';

export class OthelloController {
  /**
   * 対戦開始
   * @returns
   */
  async start(): Promise<StartGameResponse> {
    console.log('game start!!!!');
    const response = await Api.post<StartGameResponse>('/api/othello');
    return response.data;
  }

  /**
   * 中断
   * @returns
   */
  async changeStatus(gameId: number, status: GameStatus) {
    console.log('pause!!!!');
    const response = await Api.put<ChangeGameStatusResponse>(`/api/othello/${gameId}`, {
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
