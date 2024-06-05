import { IDB } from '@/lib/databases/interfaces';

export class ImageGateway {
  constructor(private readonly db: IDB) {}

  async findAll<T>(): Promise<T[]> {
    return await this.db.execute<T>(`select * from uploaded_images`);
  }

  async findById<T>(id: string): Promise<T> {
    const result = await this.db.execute<T>(`select * from uploaded_images where id='${id}'`);
    return result[0];
  }
}
