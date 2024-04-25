'use client';
import { OthelloBoard } from '@/app/othello/components/OthelloBoard';
import { OthelloGameController } from '@/app/othello/components/OthelloGameController';
import { OthelloTurn } from '@/app/othello/components/OthelloTurn';
import { OthelloProvider } from '@/app/othello/features/hooks';
// build時のfetch error回避
export const dynamic = 'force-dynamic';

export default async function page() {
  return (
    <OthelloProvider>
      <div className='w-[600px] sm:w-auto flex flex-col justify-between items-center gap-4'>
        <OthelloGameController></OthelloGameController>
        <OthelloTurn></OthelloTurn>
        <OthelloBoard></OthelloBoard>
      </div>
    </OthelloProvider>
  );
}
