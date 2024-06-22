'use client';

import { TURN_NAME } from '@/features/othello/common';
import { useOthelloState } from '@/features/othello/hooks/provider';

export const OthelloTurn = () => {
  const { othelloState } = useOthelloState();
  return (
    <div>
      {othelloState.winner ? (
        <p className='text-red-600 font-bold text-xl'>{othelloState.winner}</p>
      ) : (
        <p>{TURN_NAME[othelloState.nowTurnVal]}のターン</p>
      )}
    </div>
  );
};
