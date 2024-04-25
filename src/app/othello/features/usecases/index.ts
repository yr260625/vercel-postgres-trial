'use client';

import { GAME_STATUS } from '@/app/othello/common';

export class OthelloUsecases {
  async start() {
    console.log('game start!!!!');
    const response = await fetch(`${process.env.NEXT_PUBLIC_MY_SERVER}/api/othello`, {
      method: 'POST',
      cache: 'no-store',
    });
    return await response.json();
  }

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

  async putStone(gameId: number, nowTurn: number, turnCount: number, x: number, y: number) {
    console.log('put stone!!!');
    const response = await fetch(`${process.env.NEXT_PUBLIC_MY_SERVER}/api/othello/board`, {
      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify({
        gameId,
        nowTurn,
        turnCount,
        x,
        y,
      }),
    });
    return await response.json();
  }

  async judgement(gameId: number) {
    console.log('judgement!!!');
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MY_SERVER}/api/othello/judge/${gameId}`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );
  }
}
