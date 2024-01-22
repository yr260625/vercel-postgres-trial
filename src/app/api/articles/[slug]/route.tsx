import { sql } from "@vercel/postgres";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const uid = params.slug;
  const data = await sql`select * from articles where uid = ${uid}`;
  return Response.json(data.rows[0]);
}
