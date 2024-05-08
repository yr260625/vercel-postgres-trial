'use server';
import { ATransactionHandler } from '@/app/api/transaction-interface';
import { TurnRepostitory } from '@/app/othello/features/domain/turn-repository';
import { OthelloUsecases } from '@/app/othello/features/usecase';
import { IDB } from '@/libs/databases/interfaces';
import { NextResponse } from 'next/server';
import { GameRepostitory } from '@/app/othello/features/domain/game-repository';

/**
 * 対戦開始時に呼び出されるリクエスト
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
    const turnRepo = new TurnRepostitory(db);
    const usecases = new OthelloUsecases(gameRepo, turnRepo);
    const res = await usecases.gameStart();
    return NextResponse.json(res);
  }
  async handleError(error: any): Promise<any> {
    console.log(error);
    throw new Error('game start error');
  }
}
