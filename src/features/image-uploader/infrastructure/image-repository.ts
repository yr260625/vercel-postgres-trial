import { IDB } from '@/libs/databases/interfaces';

export class ImageRepostitory {
  constructor(private readonly db: IDB) {}

  async findAll() {}

  async findById(id: number) {}
}
