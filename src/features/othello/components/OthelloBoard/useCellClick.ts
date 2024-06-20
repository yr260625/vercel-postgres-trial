import { GAME_STATUS } from '@/features/othello/common';
import { OthelloController } from '@/features/othello/components/controller';
import { Board } from '@/features/othello/domain/board';
import { OthelloState, useOthelloState } from '@/features/othello/hooks/hooks';
import { useCallback } from 'react';

export const useCellClick = () => {
  const { othelloState, setOthelloState } = useOthelloState();
  const board = new Board(othelloState.nowBoard);
  const pointsReversible = board.getReversibleMatrix(othelloState.nowTurnVal);

  const memonizedCellClick = useCallback(
    async (prevState: OthelloState, x: number, y: number) => {
      try {
        // 石を置く
        const controller = new OthelloController();
        const res = await controller.putStone(
          prevState.gameId,
          prevState.nowTurnVal,
          prevState.nowTurnCount,
          x,
          y
        );
        const newStatus = res.winner ? GAME_STATUS.BEFORE_STARTING : prevState.gameState;
        setOthelloState({
          nowBoard: res.nextBoard,
          nowTurnVal: res.nextTurnVal,
          nowTurnCount: res.nextTurnCount,
          winner: res.winner,
          gameState: newStatus,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [setOthelloState]
  );

  return { othelloState, pointsReversible, memonizedCellClick };
};