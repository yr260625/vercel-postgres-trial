import { IDB } from '@/libs/databases/interfaces';
import { createDbClient } from '@/libs/databases/postgres';

/**
 * トランザクション処理テンプレートクラス
 */
export abstract class ATransactionHandler {
  abstract execute(db: IDB): Promise<unknown>;
  abstract handleError(error: unknown): Promise<unknown>;

  /**
   * トランザクション処理テンプレートメソッド
   *
   * @async
   * @template T
   * @returns {Promise<T>}
   */
  async transaction<T>(): Promise<T> {
    const db = await createDbClient();
    try {
      await db.begin();
      const response = await this.execute(db);
      await db.commit();
      return response as T;
    } catch (error: unknown) {
      await db.rollback();
      return this.handleError(error) as T;
    } finally {
      await db.disconnect();
    }
  }
}
