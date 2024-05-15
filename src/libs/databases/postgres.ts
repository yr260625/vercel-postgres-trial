import { IDB } from '@/libs/databases/interfaces';
import { VercelPoolClient, createPool } from '@vercel/postgres';
const pool = createPool({
  idleTimeoutMillis: 10000,
  allowExitOnIdle: true,
});

/**
 * '@vercel/postgres'をラッピングしたクラス
 */
class VerecelPostgres implements IDB {
  private client!: VercelPoolClient;

  /**
   * コネクション確立
   * @return {Promise<void>}
   */
  async connect(): Promise<void> {
    this.client = await pool.connect();
  }

  /**
   * SQL実行
   *
   * @async
   * @template T
   * @param {string} query
   * @param {?Array<number | string>} [params]
   * @returns {Promise<T[]>}
   */
  async execute<T>(query: string, params?: Array<number | string>): Promise<T[]> {
    return (await this.client.query(query, params)).rows;
  }

  /**
   * コネクション終了
   * @return {Promise<void>}
   */
  async disconnect(): Promise<void> {
    this.client.release();
  }

  /**
   * トランザクション開始
   * @return {Promise<void>}
   */
  async begin(): Promise<void> {
    await this.client.query('BEGIN');
  }

  /**
   * コミット
   * @return {Promise<void>}
   */
  async commit(): Promise<void> {
    await this.client.query('COMMIT');
  }

  /**
   * ロールバック
   * @return {Promise<void>}
   */
  async rollback(): Promise<void> {
    await this.client.query('ROLLBACK');
  }
}

/**
 * DBクライアント生成
 * @return {Promise<DB>}
 */
export const createDbClient = async (): Promise<IDB> => {
  const client = new VerecelPostgres();
  await client.connect();
  return client;
};
