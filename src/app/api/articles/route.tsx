import { sql } from "@vercel/postgres";

export async function GET() {
  const data = await sql`select * from articles order by uid`;
  return Response.json(data.rows);
}
