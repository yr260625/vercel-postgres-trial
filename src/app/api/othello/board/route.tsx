'use server';
import { ATransactionHandler } from '@/app/api/transaction-interface';
import { Turn } from '@/app/othello/common';
import { Point } from '@/app/othello/features/domains/point';
import { BoardRepostitory } from '@/app/othello/features/repositories/board-repository';
import { GameRepostitory } from '@/app/othello/features/repositories/game-repository';
import { TurnRepostitory } from '@/app/othello/features/repositories/turn-repository';
import { OthelloUsecases } from '@/app/othello/features/usecases';
import { IDB } from '@/libs/databases/interfaces';
import { NextResponse } from 'next/server';

type RequestBody = {
  gameId: number;
  turnCount: number;
  nowTurn: Turn;
  x: number;
  y: number;
};

/**
 * オセロゲームにおいて盤面に石を打つときに呼び出されるリクエスト
 * POST /api/othello/[id]
 * request
 *   gameId: number;
 *   turnCount: number;
 *   nowTurn: Turn;
 *   x: number;
 *   y: number;
 * response
 *   nextBoard: number[][]
 *   nextTurn: Turn
 *   winner: string
 */
export async function POST(request: Request) {
  const req = (await request.json()) as RequestBody;
  const handler = new PostTransactionHandler(req);
  return await handler.transaction();
}

class PostTransactionHandler extends ATransactionHandler {
  private readonly gameId: number;
  private readonly turnCount: number;
  private readonly nowTurn: Turn;
  private readonly point: Point;

  /**
   * コンストラクタ
   * @param request
   */
  constructor(body: RequestBody) {
    super();
    this.gameId = body.gameId;
    this.turnCount = body.turnCount;
    this.nowTurn = body.nowTurn;
    this.point = Point.create(body.x, body.y);
  }

  async execute(db: IDB): Promise<any> {
    const gameRepo = new GameRepostitory(db);
    const boardRepo = new BoardRepostitory(db);
    const turnRepo = new TurnRepostitory(db);
    const usecases = new OthelloUsecases(gameRepo, boardRepo, turnRepo);
    const res = await usecases.putStone(this.gameId, this.turnCount, this.nowTurn, this.point);
    return NextResponse.json(res);
  }
  async handleError(error: any): Promise<any> {
    console.log(error);
    throw NextResponse.json({ error }, { status: 500 });
  }
}
