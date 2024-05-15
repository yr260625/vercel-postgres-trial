'use server';
import { ATransactionHandler } from '@/app/api/transaction-interface';
import { TurnRepostitory } from '@/app/othello/features/infrastructure/turn-repository';
import { OthelloUsecases } from '@/app/othello/features/usecase';
import { IDB } from '@/libs/databases/interfaces';
import { NextResponse } from 'next/server';
import { GameRepostitory } from '@/app/othello/features/infrastructure/game-repository';
import { ApplicationError } from '@/app/othello/common/error/application-error';
import { DomainError } from '@/app/othello/common/error/domain-error';

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
  /**
   * Description placeholder
   *
   * @async
   * @param {IDB} db
   * @returns {Promise<NextResponse>}
   */
  async execute(db: IDB): Promise<NextResponse> {
    const gameRepo = new GameRepostitory(db);
    const turnRepo = new TurnRepostitory(db);
    const usecases = new OthelloUsecases(gameRepo, turnRepo);
    const res = await usecases.gameStart();
    return NextResponse.json(res);
  }

  /**
   * Description placeholder
   *
   * @async
   * @param {unknown} error
   * @returns {Promise<NextResponse>}
   */
  async handleError(error: Error): Promise<NextResponse> {
    console.error(error);
    if (error instanceof DomainError) {
      return NextResponse.json({ type: error.type, message: error.message }, { status: 400 });
    }
    if (error instanceof ApplicationError) {
      return NextResponse.json({ type: error.type, message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { type: 'UnexpectedError', message: error.message },
      { status: 500 }
    );
  }
}
