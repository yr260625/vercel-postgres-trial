'use server';
import { GameStatus } from '@/app/othello/common';
import { DB, createDbClient } from '@/libs/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: number } }) {
  const db = await createDbClient();
  const id = params.id;
  const data = await findOthelloGameById(db, id);
  return NextResponse.json(data);
}

const findOthelloGameById = async (db: DB, id: number) => {
  const result = await db.execute(`select * from othello_games where id=${id}`);
  return result[0];
};

export async function PUT(request: Request, { params }: { params: { id: number } }) {
  const db = await createDbClient();
  try {
    await db.begin();
    const id = params.id;
    const req = await request.json();
    const status = req.status as GameStatus;
    const res = await modifyOthelloGameState(db, id, status);
    await db.commit();
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    await db.rollback();
    throw new Error('status modifying error');
  } finally {
    await db.disconnect();
  }
}

const modifyOthelloGameState = async (db: DB, gameId: number, status: GameStatus) => {
  const result = await db.execute(
    `
    update othello_games
      set status=$1
      where id=$2
    returning status
  `,
    [status, gameId]
  );
  return result[0].status;
};
