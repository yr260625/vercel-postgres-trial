'use client';

import { Button } from '@/components/ui/button';
import { GAME_STATUS, GameStatus } from '@/features/othello/common';
import { OthelloController } from '@/features/othello/components/controller';
import { useOthelloInitState, useOthelloState } from '@/features/othello/hooks/hooks';

export const OthelloGameStarter = () => {
  const { othelloState, setOthelloState } = useOthelloState();
  const { initState } = useOthelloInitState();
  const controller = new OthelloController();

  const handleStart = async () => {
    try {
      const { gameId } = await controller.start();
      setOthelloState({
        ...initState,
        gameId: Number(gameId),
        gameState: GAME_STATUS.STARTING,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeStatus = async (status: GameStatus) => {
    try {
      await controller.changeStatus(othelloState.gameId, status);
      setOthelloState({
        ...othelloState,
        gameState: status,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {othelloState.gameState === GAME_STATUS.STARTING ? (
        <Button
          className='w-24'
          variant='destructive'
          onClick={() => handleChangeStatus(GAME_STATUS.PAUSE)}
        >
          一時停止
        </Button>
      ) : othelloState.gameState === GAME_STATUS.PAUSE ? (
        <Button
          className='w-24'
          variant='outline'
          onClick={() => handleChangeStatus(GAME_STATUS.STARTING)}
        >
          再開
        </Button>
      ) : (
        <Button className='w-24' variant='outline' onClick={() => handleStart()}>
          対戦開始
        </Button>
      )}
    </>
  );
};
