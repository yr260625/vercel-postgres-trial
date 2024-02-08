"use server";

import { sql } from "@vercel/postgres";

export async function GET() {
  const data = await sql`select * from uploaded_images`;
  return Response.json(data.rows);
}
