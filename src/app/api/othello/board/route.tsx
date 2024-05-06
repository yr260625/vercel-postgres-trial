'use server';
import { ATransactionHandler } from '@/app/api/transaction-interface';
import { GameTurnVal } from '@/app/othello/common';
import { Point } from '@/app/othello/features/domains/point';
import { BoardRepostitory } from '@/app/othello/features/repositories/board-repository';
import { GameRepostitory } from '@/app/othello/features/repositories/game-repository';
import { TurnRepostitory } from '@/app/othello/features/repositories/turn-repository';
import { OthelloUsecases } from '@/app/othello/features/usecases';
import { IDB } from '@/libs/databases/interfaces';
import { NextResponse } from 'next/server';

export type RequestBody = {
  gameId: number;
  turnCount: number;
  nowTurn: GameTurnVal;
  x: number;
  y: number;
};

export type ResponseBody = {
  nextBoard: number[][];
  nextTurn: number;
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
  private readonly point: Point;

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
    this.point = new Point(body.x, body.y);
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
    const boardRepo = new BoardRepostitory(db);
    const turnRepo = new TurnRepostitory(db);
    const usecases = new OthelloUsecases(gameRepo, boardRepo, turnRepo);
    const res = await usecases.putStone(this.gameId, this.turnCount, this.nowTurn, this.point);
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
