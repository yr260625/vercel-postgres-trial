import { VercelPoolClient, createPool } from '@vercel/postgres';
const pool = createPool({
  idleTimeoutMillis: 10000,
  allowExitOnIdle: true,
});

export interface DB {
  connect(): Promise<void>;
  execute(query: string, params?: Array<any>): Promise<any>;
  disconnect(): Promise<void>;
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

/**
 * '@vercel/postgres'をラッピングしたクラス
 */
class VerecelPostgres implements DB {
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
   * @param query
   * @param params?
   * @return {Promise<any>}
   */
  async execute(query: string, params?: []): Promise<any> {
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
export const createDbClient = async (): Promise<DB> => {
  const client = new VerecelPostgres();
  await client.connect();
  return client;
};
