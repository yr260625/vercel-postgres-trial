'use server';
import { ATransactionHandler } from '@/app/api/transaction-interface';
import { BaseErrorType } from '@/features/othello/common';
import { ApplicationError } from '@/features/othello/common/error/application-error';
import { DomainError } from '@/features/othello/common/error/domain-error';
import { GameRepostitory } from '@/features/othello/infrastructure/game-repository';
import { StartGameUsecase } from '@/features/othello/usecases/startGameUsecase';
import { IDB } from '@/lib/databases/interfaces';
import { NextResponse } from 'next/server';

export type StartGameResponse = {
  gameId: number;
};

type BaseResponseType<T, V> = [T | V, { status: number }];
type ResponseType = BaseResponseType<StartGameResponse, BaseErrorType>;

/**
 * 対戦開始時に呼び出されるリクエスト
 * POST /api/othello/board
 * request なし
 * response
 *   gameId: 新規登録されたゲームID
 */
export async function POST(): Promise<NextResponse> {
  const handler = new PostTransactionHandler();
  const response = await handler.transaction<ResponseType>();
  return NextResponse.json(...response);
}

class PostTransactionHandler extends ATransactionHandler {
  /**
   * 実装 - メイン処理
   *
   * @async
   * @param {IDB} db
   * @returns {Promise<ResponseType>}
   */
  async execute(db: IDB): Promise<ResponseType> {
    const gameRepo = new GameRepostitory(db);
    const usecases = new StartGameUsecase(gameRepo);
    const res = await usecases.run();
    return [res, { status: 200 }];
  }

  /**
   * 実装 - エラーハンドリング
   *
   * @async
   * @param {Error} error
   * @returns {Promise<ResponseType>}
   */
  async handleError(error: Error): Promise<ResponseType> {
    console.error(error);
    if (error instanceof DomainError) {
      return [{ type: error.type, message: error.message }, { status: 400 }];
    }
    if (error instanceof ApplicationError) {
      return [{ type: error.type, message: error.message }, { status: 500 }];
    }
    return [{ type: 'UnexpectedError', message: error.message }, { status: 500 }];
  }
}
