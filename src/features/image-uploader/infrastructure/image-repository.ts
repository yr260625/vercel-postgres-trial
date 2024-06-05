import { ImageGateway } from '@/features/image-uploader/infrastructure/gateway/image-gateway';
import { IDB } from '@/lib/databases/interfaces';

export type ImageRecord = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export class ImageRepostitory {
  constructor(private readonly db: IDB) {}
  private imageGateway = new ImageGateway(this.db);

  async findAll(): Promise<ImageRecord[]> {
    return this.imageGateway.findAll<ImageRecord>();
  }

  async findById(id: string): Promise<ImageRecord> {
    return this.imageGateway.findById<ImageRecord>(id);
  }
}
