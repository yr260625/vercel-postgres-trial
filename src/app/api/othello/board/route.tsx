'use server';
import { GAME_TURN, Turn } from '@/app/othello/common';
import {
  findCurrentBoardById,
  judgeWinner,
  canPut,
  getwalledBoard,
  reverseStoneOnBoard,
  createNextBoard,
  createNextTurn,
  createNextMove,
  getFlippablePointsAll,
  hasFilippablePoints,
} from '@/app/othello/features/domains';
import { createDbClient } from '@/libs/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  // 現在の盤面を取得
  const db = await createDbClient();
  const gameId = 9;
  const turnCount = 12;
  const nowBoard = await findCurrentBoardById(db, gameId);
  console.log(nowBoard);
  // 勝敗判定
  const winner = judgeWinner(nowBoard);

  return NextResponse.json({ winner });
}

export async function POST(request: Request) {
  const db = await createDbClient();
  try {
    await db.begin();
    const req = await request.json();
    const nowTurn = req.nowTurn as Turn;

    // 現在の盤面を取得
    const gameId = req.gameId as number;
    const turnCount = req.turnCount as number;
    const nowBoard = await findCurrentBoardById(db, gameId);

    // 与えられた座標が配置可能かどうか
    const x = req.x as number;
    const y = req.y as number;
    const startingPoint = { x, y };
    if (!canPut(nowBoard, startingPoint)) {
      console.log('cannot put stone');
      throw new Error('cannot put stone');
    }

    // 反転する石があるかどうか
    const walledBoard = getwalledBoard(nowBoard);
    const flippablePoints = getFlippablePointsAll(walledBoard, nowTurn, startingPoint);
    if (flippablePoints.length === 0) {
      console.log('cannot reverse stone');
      throw new Error('cannot reverse stone');
    }

    // 反転する
    const nextBoard = reverseStoneOnBoard(nowBoard, nowTurn, startingPoint, flippablePoints);

    // DB更新
    await Promise.all([
      createNextBoard(db, gameId, turnCount, nextBoard),
      createNextTurn(db, gameId, turnCount),
      createNextMove(db, gameId, turnCount, nowTurn, startingPoint),
    ]);
    await db.commit();

    // 次ターン
    let nextTurn = nowTurn === GAME_TURN.BLACK ? GAME_TURN.WHITE : GAME_TURN.BLACK;
    let winner = '';
    if (!hasFilippablePoints(nextBoard, nextTurn)) {
      nextTurn = nowTurn;
      if (!hasFilippablePoints(nextBoard, nowTurn)) {
        // 勝敗判定
        winner = judgeWinner(nextBoard);
      }
    }

    return NextResponse.json({ nextBoard, nextTurn, winner });
  } catch (error) {
    console.log(error);
    await db.rollback();
    throw NextResponse.json({ error }, { status: 500 });
  } finally {
    await db.disconnect();
  }
}
