'use server';
import { ATransactionHandler } from '@/app/api/transaction-interface';
import { GameTurnVal } from '@/app/othello/common';
import { OthelloUsecases } from '@/app/othello/features/usecase';
import { IDB } from '@/libs/databases/interfaces';
import { NextResponse } from 'next/server';
import { TurnRepostitory } from '@/app/othello/features/domain/turn-repository';
import { GameRepostitory } from '@/app/othello/features/domain/game-repository';

export type RequestBody = {
  gameId: number;
  turnCount: number;
  nowTurn: GameTurnVal;
  x: number;
  y: number;
};

export type ResponseBody = {
  nextBoard: number[][];
  nextTurnVal: number;
  nextTurnCount: number;
  winner: string;
};

/**
 * 盤面に石を打つときに呼び出されるリクエスト
 *
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
  const res = await handler.transaction<ResponseBody>();
  return NextResponse.json(res);
}

/**
 * 実装 - トランザクション処理クラス
 */
class PostTransactionHandler extends ATransactionHandler {
  private readonly gameId: number;
  private readonly turnCount: number;
  private readonly nowTurn: GameTurnVal;
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
    this.turnCount = body.turnCount;
    this.nowTurn = body.nowTurn;
    this.x = body.x;
    this.y = body.y;
  }

  /**
   * 実装 - メイン処理
   *
   * @async
   * @param {IDB} db
   * @returns {Promise<ResponseBody>}
   */
  async execute(db: IDB): Promise<ResponseBody> {
    const gameRepo = new GameRepostitory(db);
    const turnRepo = new TurnRepostitory(db);
    const usecases = new OthelloUsecases(gameRepo, turnRepo);
    const res = await usecases.putStone(
      this.gameId,
      this.turnCount,
      this.nowTurn,
      this.x,
      this.y
    );
    return res;
  }

  /**
   * 実装 - エラーハンドリング
   *
   * @async
   * @param {unknown} error
   * @returns {Promise<void>}
   */
  async handleError(error: unknown): Promise<void> {
    console.log(error);
    throw NextResponse.json({ error }, { status: 500 });
  }
}
