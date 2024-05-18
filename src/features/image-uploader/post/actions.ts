"use server";
import { QueryResult, QueryResultRow, sql } from "@vercel/postgres";

type uploadedImage = {
  title: string;
  description: string;
  dataUrl: string;
};

/**
 * 画像アップロード
 * @param param0: uploadedImage
 * @returns: Promise<QueryResult<QueryResultRow>>
 */
export async function uploadImage({
  title,
  description,
  dataUrl,
}: uploadedImage): Promise<QueryResult<QueryResultRow>> {
  const data =
    await sql`insert into uploaded_images(id, title, thumbnail, description, created_at) values (
    ${crypto.randomUUID()},
    ${title},
    ${dataUrl},
    ${description},
    current_timestamp
  )`;
  return data;
}
