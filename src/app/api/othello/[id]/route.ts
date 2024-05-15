'use server';
import { ATransactionHandler } from '@/app/api/transaction-interface';
import { GameStatus } from '@/app/othello/common';
import { BoardGateway } from '@/app/othello/features/infrastructure/gateway/board-gateway';
import { GameGateway } from '@/app/othello/features/infrastructure/gateway/game-gateway';
import { TurnRepostitory } from '@/app/othello/features/infrastructure/turn-repository';
import { OthelloUsecases } from '@/app/othello/features/usecase';
import { IDB } from '@/libs/databases/interfaces';
import { NextResponse } from 'next/server';
import { GameRepostitory } from '@/app/othello/features/infrastructure/game-repository';
import { DomainError } from '@/app/othello/common/error/domain-error';
import { ApplicationError } from '@/app/othello/common/error/application-error';

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

  /**
   * Description placeholder
   *
   * @async
   * @param {*} error
   * @returns {Promise<any>}
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
