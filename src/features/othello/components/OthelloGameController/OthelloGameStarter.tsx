'use client';

import { Button } from '@/components/ui/button';
import { GAME_STATUS } from '@/features/othello/common';
import { useOthelloGame } from '@/features/othello/components/OthelloGameController/useOthelloGame';
import { useOthelloState } from '@/features/othello/hooks/provider';

export const OthelloGameStarter = () => {
  const { othelloState } = useOthelloState();
  const { handleGameStart, handleGamePause, handleGameRestart } = useOthelloGame();

  console.log('render OthelloGameStarter');

  return (
    <>
      {othelloState.gameState === GAME_STATUS.STARTING ? (
        <Button className='w-24' variant='destructive' onClick={handleGamePause}>
          一時停止
        </Button>
      ) : othelloState.gameState === GAME_STATUS.PAUSE ? (
        <Button className='w-24' onClick={handleGameRestart}>
          再開
        </Button>
      ) : (
        <Button className='w-24' onClick={handleGameStart}>
          対戦開始
        </Button>
      )}
    </>
  );
};
