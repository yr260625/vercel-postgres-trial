import { GAME_STATUS, GameStatus, OTHELLO_INIT_STATE } from '@/features/othello/common';
import { gameStart, changeGameStatus } from '@/features/othello/hooks/othello-api';
import { useOthelloState } from '@/features/othello/hooks/provider';
import { useCallback } from 'react';

export const useOthelloGame = () => {
  const { othelloState, setOthelloState } = useOthelloState();

  const handleGameStart = useCallback(async () => {
    const start = async () => {
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
    };
    await start();
  }, [setOthelloState]);

  const handleChangeGameStatus = useCallback(
    async (status: GameStatus) => {
      const changeStatus = async (status: GameStatus) => {
        try {
          await changeGameStatus(othelloState.gameId, status);
          setOthelloState({
            ...othelloState,
            gameState: status,
          });
        } catch (error) {
          console.error(error);
        }
      };
      await changeStatus(status);
    },
    [othelloState, setOthelloState]
  );

  return { handleGameStart, handleChangeGameStatus };
};
