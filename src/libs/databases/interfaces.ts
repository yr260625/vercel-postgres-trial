export interface IDB {
  connect(): Promise<void>;
  execute(query: string, params?: Array<any>): Promise<any>;
  disconnect(): Promise<void>;
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}
