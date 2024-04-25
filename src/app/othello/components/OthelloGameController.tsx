'use client';
import { GAME_STATUS, GAME_TURN, INIT_BOARD } from '@/app/othello/common';
import { useOthelloInitState, useOthelloState } from '@/app/othello/features/hooks';
import { OthelloUsecases } from '@/app/othello/features/usecases';
import { NormalButton } from '@/components/ui-parts/buttons/NormalButton';

export const OthelloGameController = () => {
  const { othelloState, setOthelloState } = useOthelloState();
  const { initState } = useOthelloInitState();
  console.log(othelloState);

  const handleStart = async () => {
    try {
      const othelloUsecases = new OthelloUsecases();
      const { gameId } = await othelloUsecases.start();
      setOthelloState({
        ...initState,
        gameId: Number(gameId),
        gameState: GAME_STATUS.STARTING,
        turnCount: 1,
      });
    } catch (error) {
      window.alert(error);
    }
  };

  const handlePause = async () => {
    try {
      const othelloUsecases = new OthelloUsecases();
      await othelloUsecases.pause(othelloState.gameId);
      setOthelloState({
        ...othelloState,
        gameState: GAME_STATUS.PAUSE,
      });
    } catch (error) {
      window.alert(error);
    }
  };

  const handleRestart = async () => {
    try {
      const othelloUsecases = new OthelloUsecases();
      await othelloUsecases.restart(othelloState.gameId);
      setOthelloState({
        ...othelloState,
        gameState: GAME_STATUS.STARTING,
      });
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <div className='flex justify-between items-center gap-4'>
      <div className='flex items-center gap-4'>
        <div>
          <input type='radio' name='turn' id='sente' />
          <label htmlFor='sente'>先手</label>
        </div>
        <div>
          <input type='radio' name='turn' id='gote' />
          <label htmlFor='gote'>後手</label>
        </div>
      </div>
      {othelloState.gameState === GAME_STATUS.STARTING ? (
        <NormalButton clickHandler={() => handlePause()}>一時停止</NormalButton>
      ) : othelloState.gameState === GAME_STATUS.PAUSE ? (
        <NormalButton clickHandler={() => handleRestart()}>再開</NormalButton>
      ) : (
        <NormalButton clickHandler={() => handleStart()}>対戦開始</NormalButton>
      )}
    </div>
  );
};
