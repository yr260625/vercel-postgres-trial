'use server';
import { ATransactionHandler } from '@/app/api/transaction-interface';
import { GameStatus, BaseErrorType } from '@/features/othello/common';
import { ApplicationError } from '@/features/othello/common/error/application-error';
import { DomainError } from '@/features/othello/common/error/domain-error';
import { GameRepostitory } from '@/features/othello/infrastructure/game-repository';
import { ModifyGameStatus } from '@/features/othello/usecases/modifyGameStatus';
import { IDB } from '@/lib/databases/interfaces';
import { NextResponse } from 'next/server';

type RequestBody = {
  status: GameStatus;
};

type ResponseBody = {
  status: GameStatus;
};

type BaseResponseType<T, V> = [T | V, { status: number }];
type ResponseType = BaseResponseType<ResponseBody, BaseErrorType>;

/**
 * オセロゲームの状態更新時に呼び出されるリクエスト
 * PUT /api/othello/[id]
 * request
 *   status: GameStatus
 * response
 *   status: GameStatus
 */
export async function PUT(request: Request, { params }: { params: { id: number } }) {
  const gameId: number = params.id;
  const body = (await request.json()) as { status: GameStatus };
  const handler = new PutTransactionHandler(gameId, body);
  const response = await handler.transaction<ResponseType>();
  return NextResponse.json(...response);
}

/**
 * トランザクション
 */
class PutTransactionHandler extends ATransactionHandler {
  private readonly gameId: number;
  private readonly status: GameStatus;

  /**
   * コンストラクタ
   *
   * @constructor
   * @param {number} gameId
   * @param {RequestBody} body
   */
  constructor(gameId: number, body: RequestBody) {
    super();
    this.gameId = gameId;
    this.status = body.status;
  }

  /**
   * 実装 - メイン処理
   *
   * @async
   * @param {IDB} db
   * @returns {Promise<ResponseType>}
   */
  async execute(db: IDB): Promise<ResponseType> {
    const gameRepo = new GameRepostitory(db);
    const usecases = new ModifyGameStatus(gameRepo);
    const res = await usecases.run(this.gameId, this.status);
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
