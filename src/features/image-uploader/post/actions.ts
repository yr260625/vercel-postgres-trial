'use server';
import { createDbClient } from '@/lib/databases/postgres';

type uploadedImage = {
  title: string;
  description: string;
  thumbnail: string;
};

/**
 * 画像アップロード
 *
 * @export
 * @async
 * @param {uploadedImage} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} props.thumbnail
 * @returns {Promise<QueryResult<QueryResultRow>>}
 */
export async function uploadImage({
  title,
  description,
  thumbnail,
}: uploadedImage): Promise<any> {
  type Row = { id: string };
  const db = await createDbClient();
  const data = await db.execute<Row>(
    `insert into 
    uploaded_images(id, title, thumbnail, description, created_at)
    values ($1, $2, $3, $4, current_timestamp)
    returning id`,
    [crypto.randomUUID(), title, thumbnail, description]
  );
  return data[0].id;
}
