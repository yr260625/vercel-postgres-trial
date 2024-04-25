'use server';
import { INIT_BOARD } from '@/app/othello/common';
import { DB, createDbClient } from '@/libs/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  const db = await createDbClient();
  const data = await db.execute(`select * from othello_games`);
  return NextResponse.json(data.rows);
}

export async function POST() {
  const db = await createDbClient();
  try {
    await db.begin();
    const gameId = await beginMatch(db);
    const turnCount = await initTurn(db, gameId);
    const board = await initBoard(db, gameId);
    await db.commit();
    console.log({ gameId, board, turnCount });
    return NextResponse.json({ gameId, board, turnCount });
  } catch (error) {
    console.log(error);
    await db.rollback();
    throw new Error('game start error');
  } finally {
    await db.disconnect();
  }
}

const beginMatch = async (db: DB) => {
  const result = await db.execute(`insert into 
    othello_games(status, created_at) 
    values ('対戦中', current_timestamp)
    returning id
  `);
  return result[0].id;
};

const initTurn = async (db: DB, gameId: number) => {
  const result = await db.execute(
    `insert into 
    othello_turns(game_id, turn_count, end_at) 
    values ($1, 0, current_timestamp)
    returning turn_count`,
    [gameId]
  );

  return result[0].turn_count;
};

const initBoard = async (db: DB, gameId: number) => {
  const result = await db.execute(
    `insert into 
    othello_boards(game_id, turn_count, board_configuration) 
    values ($1, 0, $2)
    returning board_configuration`,
    [gameId, JSON.stringify(INIT_BOARD)]
  );

  return result[0].board_configuration;
};
