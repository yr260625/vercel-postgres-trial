'use server';
import { ATransactionHandler } from '@/app/api/transaction-interface';
import { BoardRepostitory } from '@/app/othello/features/repositories/board-repository';
import { GameRepostitory } from '@/app/othello/features/repositories/game-repository';
import { TurnRepostitory } from '@/app/othello/features/repositories/turn-repository';
import { OthelloUsecases } from '@/app/othello/features/usecases';
import { IDB } from '@/libs/databases/interfaces';
import { NextResponse } from 'next/server';

/**
 * オセロゲームの対戦開始時に呼び出されるリクエスト
 * POST /api/othello/board
 * request なし
 * response
 *   gameId: 新規登録されたゲームID
 */
export async function POST() {
  const handler = new PostTransactionHandler();
  return await handler.transaction();
}

class PostTransactionHandler extends ATransactionHandler {
  async execute(db: IDB): Promise<any> {
    const gameRepo = new GameRepostitory(db);
    const boardRepo = new BoardRepostitory(db);
    const turnRepo = new TurnRepostitory(db);
    const usecases = new OthelloUsecases(gameRepo, boardRepo, turnRepo);
    const res = await usecases.gameStart();
    return NextResponse.json(res);
  }
  async handleError(error: any): Promise<any> {
    console.log(error);
    throw new Error('game start error');
  }
}
