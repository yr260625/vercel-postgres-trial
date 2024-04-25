"use server";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await sql`select * from uploaded_images`;
  return NextResponse.json(data.rows);
}
