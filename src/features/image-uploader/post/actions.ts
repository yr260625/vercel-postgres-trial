'use server';
import { createDbClient } from '@/libs/databases/postgres';

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
}: uploadedImage): Promise<any> {
  type Row = { id: string };
  const db = await createDbClient();
  const data = await db.execute<Row>(
    `insert into 
    uploaded_images(id, title, thumbnail, description, created_at)
    values ($1, $2, $3, $4, current_timestamp)
    returning id`,
    [crypto.randomUUID(), title, dataUrl, description]
  );
  return data[0].id;
}
