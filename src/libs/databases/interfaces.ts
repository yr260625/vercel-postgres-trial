export interface IDB {
  connect(): Promise<void>;
  execute<T>(query: string, params?: Array<number | string>): Promise<T[]>;
  disconnect(): Promise<void>;
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}
