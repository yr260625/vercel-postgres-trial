'use server';
import { ATransactionHandler } from '@/app/api/transaction-interface';
import { GameTurnVal, BaseErrorType } from '@/features/othello/common';
import { ApplicationError } from '@/features/othello/common/error/application-error';
import { DomainError } from '@/features/othello/common/error/domain-error';
import { GameRepostitory } from '@/features/othello/infrastructure/game-repository';
import { TurnRepostitory } from '@/features/othello/infrastructure/turn-repository';
import { OthelloUsecases } from '@/features/othello/usecase';
import { IDB } from '@/libs/databases/interfaces';
import { NextResponse } from 'next/server';

export type RequestBody = {
  gameId: number;
  nowTurnVal: GameTurnVal;
  nowTurnCount: number;
  x: number;
  y: number;
};

export type ResponseBody = {
  nextBoard: number[][];
  nextTurnVal: GameTurnVal;
  nextTurnCount: number;
  winner: string;
};

type BaseResponseType<T, V> = [T | V, { status: number }];
type ResponseType = BaseResponseType<ResponseBody, BaseErrorType>;

/**
 * 盤面に石を打つときに呼び出されるリクエスト
 * /api/othello/board
 * @export
 * @async
 * @param {Request} request
 *   gameId: number;
 *   turnCount: number;
 *   nowTurn: Turn;
 *   x: number;
 *   y: number;
 * @returns {Promise<NextResponse>}
 *   nextBoard: number[][]
 *   nextTurn: Turn
 *   winner: string
 */
export async function POST(request: Request): Promise<NextResponse> {
  const req = (await request.json()) as RequestBody;
  const handler = new PostTransactionHandler(req);
  const response = await handler.transaction<ResponseType>();
  return NextResponse.json(...response);
}

/**
 * 実装 - トランザクション処理クラス
 */
class PostTransactionHandler extends ATransactionHandler {
  private readonly gameId: number;
  private readonly nowTurnVal: GameTurnVal;
  private readonly nowTurnCount: number;
  private readonly x: number;
  private readonly y: number;

  /**
   * コンストラクタ
   *
   * @constructor
   * @param {RequestBody} body
   */
  constructor(body: RequestBody) {
    super();
    this.gameId = body.gameId;
    this.nowTurnVal = body.nowTurnVal;
    this.nowTurnCount = body.nowTurnCount;
    this.x = body.x;
    this.y = body.y;
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
    const turnRepo = new TurnRepostitory(db);
    const usecases = new OthelloUsecases(gameRepo, turnRepo);
    const res = await usecases.putStone(
      this.gameId,
      this.nowTurnVal,
      this.nowTurnCount,
      this.x,
      this.y
    );
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
