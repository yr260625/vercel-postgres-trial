'use client';

import { OthelloBoard } from '@/features/othello/components/OthelloBoard';
import { OthelloGameController } from '@/features/othello/components/OthelloGameController';
import { OthelloTurn } from '@/features/othello/components/OthelloTurn';
import { OthelloProvider } from '@/features/othello/hooks/provider';

// build時のfetch error回避
export const dynamic = 'force-dynamic';

export default function page() {
  console.log('rendering page');
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
