import { IDB } from '@/libs/databases/interfaces';
import { createDbClient } from '@/libs/databases/postgres';

export abstract class ATransactionHandler {
  abstract execute(db: IDB): Promise<any>;
  abstract handleError(error: any): Promise<any>;

  async transaction() {
    const db = await createDbClient();
    try {
      await db.begin();
      const response = await this.execute(db);
      await db.commit();
      return response;
    } catch (error) {
      await db.rollback();
      await this.handleError(error);
    } finally {
      await db.disconnect();
    }
  }
}
