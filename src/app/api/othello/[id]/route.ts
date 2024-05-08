'use server';
import { ATransactionHandler } from '@/app/api/transaction-interface';
import { GameStatus } from '@/app/othello/common';
import { BoardGateway } from '@/app/othello/features/infrastructure/board-gateway';
import { GameGateway } from '@/app/othello/features/infrastructure/game-gateway';
import { TurnRepostitory } from '@/app/othello/features/domain/turn-repository';
import { OthelloUsecases } from '@/app/othello/features/usecase';
import { IDB } from '@/libs/databases/interfaces';
import { NextResponse } from 'next/server';
import { GameRepostitory } from '@/app/othello/features/domain/game-repository';

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
    const turnRepo = new TurnRepostitory(db);
    const usecases = new OthelloUsecases(gameRepo, turnRepo);
    const res = await usecases.modifyStatus(this.gameId, this.status);
    return NextResponse.json(res);
  }
  async handleError(error: any): Promise<any> {
    console.log(error);
    throw new Error('status modifying error');
  }
}
