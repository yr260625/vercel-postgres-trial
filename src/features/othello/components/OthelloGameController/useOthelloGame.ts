import { GAME_STATUS, GameStatus, OTHELLO_INIT_STATE } from '@/features/othello/common';
import { gameStart, changeGameStatus } from '@/features/othello/hooks/othello-api';
import { useOthelloState } from '@/features/othello/hooks/provider';
import { useCallback } from 'react';

export const useOthelloGame = () => {
  const { othelloState, setOthelloState } = useOthelloState();

  const handleGameStart = useCallback(async () => {
    try {
      const { gameId } = await gameStart();
      setOthelloState({
        ...OTHELLO_INIT_STATE,
        gameId: Number(gameId),
        gameState: GAME_STATUS.STARTING,
      });
    } catch (error) {
      console.error(error);
    }
  }, [setOthelloState]);

  const handleGamePause = useCallback(async () => {
    try {
      await changeGameStatus(othelloState.gameId, GAME_STATUS.PAUSE);
      setOthelloState({
        gameState: GAME_STATUS.PAUSE,
      });
    } catch (error) {
      console.error(error);
    }
  }, [othelloState.gameId, setOthelloState]);

  const handleGameRestart = useCallback(async () => {
    try {
      await changeGameStatus(othelloState.gameId, GAME_STATUS.STARTING);
      setOthelloState({
        gameState: GAME_STATUS.STARTING,
      });
    } catch (error) {
      console.error(error);
    }
  }, [othelloState.gameId, setOthelloState]);

  return {
    handleGameStart,
    handleGamePause,
    handleGameRestart,
  };
};
