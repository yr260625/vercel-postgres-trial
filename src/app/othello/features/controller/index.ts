'use client';

import { ResponseBody } from '@/app/api/othello/board/route';
import { GAME_STATUS, GameTurnVal } from '@/app/othello/common';

export class OthelloController {
  /**
   * 対戦開始
   * @returns
   */
  async start() {
    console.log('game start!!!!');
    const response = await fetch(`${process.env.NEXT_PUBLIC_MY_SERVER}/api/othello`, {
      method: 'POST',
      cache: 'no-store',
    });
    return await response.json();
  }

  /**
   * 中断
   * @returns
   */
  async pause(gameId: number) {
    console.log('pause!!!!');
    const response = await fetch(`${process.env.NEXT_PUBLIC_MY_SERVER}/api/othello/${gameId}`, {
      method: 'PUT',
      cache: 'no-store',
      body: JSON.stringify({
        status: GAME_STATUS.PAUSE,
      }),
    });
    return await response.json();
  }

  /**
   * 再開
   * @returns
   */
  async restart(gameId: number) {
    console.log('restart!!!!');
    const response = await fetch(`${process.env.NEXT_PUBLIC_MY_SERVER}/api/othello/${gameId}`, {
      method: 'PUT',
      cache: 'no-store',
      body: JSON.stringify({
        status: GAME_STATUS.STARTING,
      }),
    });
    return await response.json();
  }

  async putStone(
    gameId: number,
    nowTurnVal: GameTurnVal,
    nowTurnCount: number,
    x: number,
    y: number
  ) {
    console.log('put stone!!!');
    const response = await fetch(`${process.env.NEXT_PUBLIC_MY_SERVER}/api/othello/board`, {
      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify({
        gameId,
        nowTurnVal,
        nowTurnCount,
        x,
        y,
      }),
    });
    return (await response.json()) as ResponseBody;
  }
}
