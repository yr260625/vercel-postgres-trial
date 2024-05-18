import { IDB } from '@/libs/databases/interfaces';

export class ImageGateway {
  constructor(private readonly db: IDB) {}

  async findAll() {
    return await this.db.execute(`select * from uploaded_images`);
  }

  async findById(id: number) {
    return await this.db.execute(`select * from uploaded_images where id = ${id}`);
  }
}
