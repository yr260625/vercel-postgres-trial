import { IDB } from '@/lib/databases/interfaces';
import { QueryResultRow } from '@vercel/postgres';

export class ImageGateway {
  constructor(private readonly db: IDB) {}

  async findAll<T extends QueryResultRow>(): Promise<T[]> {
    return await this.db.execute<T>(`select * from uploaded_images`);
  }

  async findById<T extends QueryResultRow>(id: string): Promise<T> {
    const result = await this.db.execute<T>(`select * from uploaded_images where id='${id}'`);
    return result[0];
  }
}
