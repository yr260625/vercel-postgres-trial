import { GAME_STATUS, GameStatus } from '@/features/othello/common';
import { useOthelloState, useOthelloInitState } from '@/features/othello/hooks/hooks';
import { gameStart, changeGameStatus } from '@/features/othello/hooks/othello-api';
import { useCallback } from 'react';

export const useOthelloGame = () => {
  const { othelloState, setOthelloState } = useOthelloState();
  const { initState } = useOthelloInitState();

  const handleGameStart = useCallback(async () => {
    const start = async () => {
      try {
        const { gameId } = await gameStart();
        setOthelloState({
          ...initState,
          gameId: Number(gameId),
          gameState: GAME_STATUS.STARTING,
        });
      } catch (error) {
        console.error(error);
      }
    };
    await start();
  }, [initState, setOthelloState]);

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
