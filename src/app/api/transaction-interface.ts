import { IDB } from '@/libs/databases/interfaces';
import { createDbClient } from '@/libs/databases/postgres';

/**
 * トランザクションテンプレートクラス
 */
export abstract class ATransactionHandler {
  abstract execute(db: IDB): Promise<unknown>;
  abstract handleError(error: unknown): Promise<unknown>;

  async transaction<T>(): Promise<T | unknown> {
    const db = await createDbClient();
    try {
      await db.begin();
      const response = await this.execute(db);
      await db.commit();
      return response as T;
    } catch (error: unknown) {
      await db.rollback();
      await this.handleError(error);
    } finally {
      await db.disconnect();
    }
  }
}
