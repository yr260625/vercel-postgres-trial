'use server';
import { GameStatus } from '@/app/othello/common';
import { DB, createDbClient } from '@/libs/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: number } }) {
  const db = await createDbClient();
  const id = params.id;
  const data = await findFlippablePointsById(db, id);
  return NextResponse.json(data);
}

const findFlippablePointsById = async (db: DB, id: number) => {
  const result = await db.execute(
    `select * from othello_boards where game_id=${id} order by turn_count`
  );
  return result[0];
};
