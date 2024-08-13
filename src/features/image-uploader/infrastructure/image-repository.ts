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

  /**
   * 画像一覧取得
   *
   * @async
   * @returns {Promise<ImageRecord[]>}
   */
  async findAll(): Promise<ImageRecord[]> {
    return this.imageGateway.findAll<ImageRecord>();
  }

  /**
   * 画像情報取得
   *
   * @async
   * @param {string} id
   * @returns {Promise<ImageRecord>}
   */
  async findById(id: string): Promise<ImageRecord> {
    return this.imageGateway.findById<ImageRecord>(id);
  }
}
