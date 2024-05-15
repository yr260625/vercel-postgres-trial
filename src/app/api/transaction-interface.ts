import { IDB } from '@/libs/databases/interfaces';
import { createDbClient } from '@/libs/databases/postgres';

/**
 * トランザクションテンプレートクラス
 */
export abstract class ATransactionHandler {
  abstract execute(db: IDB): Promise<unknown>;
  abstract handleError(error: unknown): Promise<unknown>;

  async transaction(): Promise<unknown> {
    const db = await createDbClient();
    try {
      await db.begin();
      const response = await this.execute(db);
      await db.commit();
      return response;
    } catch (error: unknown) {
      await db.rollback();
      return this.handleError(error);
    } finally {
      await db.disconnect();
    }
  }
}
