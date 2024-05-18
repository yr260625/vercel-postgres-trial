'use server';
import { sql } from '@vercel/postgres';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const data = await sql`select * from uploaded_images where id = ${id}`;
  return Response.json(data.rows[0]);
}
