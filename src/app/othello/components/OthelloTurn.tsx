'use client';
import { useOthelloState } from '@/app/othello/features/hooks';
import { TURN_NAME } from '@/app/othello/common';

export const OthelloTurn = () => {
  const { othelloState } = useOthelloState();
  return (
    <div>
      {othelloState.winner ? (
        <p className='text-red-600 font-bold text-xl'>{othelloState.winner}</p>
      ) : (
        <p>{TURN_NAME[othelloState.nowTurn]}のターン</p>
      )}
    </div>
  );
};
