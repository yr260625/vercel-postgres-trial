'use server';
import { ATransactionHandler } from '@/app/api/transaction-interface';
import { GameStatus } from '@/app/othello/common';
import { BoardRepostitory } from '@/app/othello/features/repositories/board-repository';
import { GameRepostitory } from '@/app/othello/features/repositories/game-repository';
import { TurnRepostitory } from '@/app/othello/features/repositories/turn-repository';
import { OthelloUsecases } from '@/app/othello/features/usecases';
import { IDB } from '@/libs/databases/interfaces';
import { NextResponse } from 'next/server';

type RequestBody = {
  status: GameStatus;
};

/**
 * オセロゲームの状態更新時に呼び出されるリクエスト
 * PUT /api/othello/[id]
 * request
 *   status: "対戦中" | "中断"
 * response
 *   status: "対戦中" | "中断"
 */
export async function PUT(request: Request, { params }: { params: { id: number } }) {
  const gameId: number = params.id;
  const body = (await request.json()) as { status: GameStatus };
  const handler = new PutTransactionHandler(gameId, body);
  return await handler.transaction();
}

/**
 * トランザクション
 */
class PutTransactionHandler extends ATransactionHandler {
  private readonly gameId: number;
  private readonly status: GameStatus;
  constructor(gameId: number, body: RequestBody) {
    super();
    this.gameId = gameId;
    this.status = body.status;
  }

  /**
   *
   * @param db
   * @returns
   */
  async execute(db: IDB): Promise<any> {
    const gameRepo = new GameRepostitory(db);
    const boardRepo = new BoardRepostitory(db);
    const turnRepo = new TurnRepostitory(db);
    const usecases = new OthelloUsecases(gameRepo, boardRepo, turnRepo);
    const res = await usecases.modifyStatus(this.gameId, this.status);
    return NextResponse.json(res);
  }
  async handleError(error: any): Promise<any> {
    console.log(error);
    throw new Error('status modifying error');
  }
}
