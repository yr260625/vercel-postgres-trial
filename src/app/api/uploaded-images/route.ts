'use server';
import { ATransactionHandler } from '@/app/api/transaction-interface';
import {
  ImageRecord,
  ImageRepostitory,
} from '@/features/image-uploader/infrastructure/image-repository';
import { BaseErrorType } from '@/features/othello/common';
import { IDB } from '@/lib/databases/interfaces';
import { NextResponse } from 'next/server';

export type AllImageResponse = { images: ImageRecord[] };
type BaseResponseType<T, V> = [T | V, { status: number }];
type ResponseType = BaseResponseType<AllImageResponse, BaseErrorType>;

export async function GET() {
  const handler = new GetTransactionHandler();
  const response = await handler.transaction<ResponseType>();
  return NextResponse.json(...response);
}

class GetTransactionHandler extends ATransactionHandler {
  /**
   * 実装 - メイン処理
   *
   * @async
   * @param {IDB} db
   * @returns {Promise<ResponseType>}
   */
  async execute(db: IDB): Promise<ResponseType> {
    const imageRepo = new ImageRepostitory(db);
    const res = await imageRepo.findAll();
    return [{ images: res }, { status: 200 }];
  }

  /**
   * 実装 - エラーハンドリング
   *
   * @async
   * @param {Error} error
   * @returns {Promise<ResponseType>}
   */
  async handleError(error: Error): Promise<ResponseType> {
    console.error(error);
    return [{ type: 'UnexpectedError', message: error.message }, { status: 500 }];
  }
}
