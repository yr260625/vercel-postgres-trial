import { ApplicationError } from '@/features/othello/common/error/application-error';
import { IDB } from '@/lib/databases/interfaces';
import { createPool } from '@vercel/postgres';
import { Pool, PoolClient, QueryResultRow } from 'pg';

/**
 * Constructs a new pool instance.
 *
 * @static
 * @returns {Pool}
 */
class PoolFactory {
  static create(): Pool {
    return String(process.env.NODE_ENV) === 'development'
      ? new Pool({
          connectionString: String(process.env.POSTGRES_URL),
          idleTimeoutMillis: 10000,
          allowExitOnIdle: true,
        })
      : createPool({
          connectionString: String(process.env.POSTGRES_URL),
          idleTimeoutMillis: 10000,
          allowExitOnIdle: true,
        });
  }
}

/**
 * '@vercel/postgres'をラッピングしたクラス
 * ローカルでは'node-postgres'を使用する
 */
class Postgres implements IDB {
  private client!: PoolClient;
  private pool = PoolFactory.create();

  /**
   * コネクション確立
   * @return {Promise<void>}
   */
  async connect(): Promise<void> {
    this.client = await this.pool.connect();
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
  async execute<T extends QueryResultRow>(
    query: string,
    params?: Array<number | string>
  ): Promise<T[]> {
    try {
      const response = await this.client.query<T>(query, params);
      return response.rows;
    } catch (error) {
      if (error instanceof Error) {
        throw new ApplicationError('FailureQueryExecution', error.message);
      }
      return [];
    }
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
  const client = new Postgres();
  await client.connect();
  return client;
};
