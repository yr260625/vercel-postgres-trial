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
  const db = await createDbClient();
  const data = await db.execute(
    `insert into 
    uploaded_images(id, title, thumbnail, description, created_at)
    values ($1, $2, $3, $4, current_timestamp)`,
    [crypto.randomUUID(), title, dataUrl, description]
  );
  return data;
}
