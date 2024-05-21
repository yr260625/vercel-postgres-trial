'use client';
import React from 'react';
import styles from './OthelloBoard.module.css';
import { GAME_STATUS } from '@/features/othello/common';
import { OthelloCell } from '@/features/othello/components/OthelloCell';
import { OthelloController } from '@/features/othello/components/controller';
import { Board } from '@/features/othello/domain/board';
import { useOthelloState } from '@/features/othello/hooks/hooks';

export const OthelloBoard = () => {
  const { othelloState, setOthelloState } = useOthelloState();
  const board = new Board(othelloState.nowBoard);
  const pointsReversible = board.getReversibleMatrix(othelloState.nowTurnVal);

  const handlePointClick = async (x: number, y: number) => {
    try {
      // 石を置く
      const controller = new OthelloController();
      const res = await controller.putStone(
        othelloState.gameId,
        othelloState.nowTurnVal,
        othelloState.nowTurnCount,
        x,
        y
      );
      const newStatus = res.winner ? GAME_STATUS.BEFORE_STARTING : othelloState.gameState;
      setOthelloState({
        ...othelloState,
        nowBoard: res.nextBoard,
        nowTurnVal: res.nextTurnVal,
        nowTurnCount: res.nextTurnCount,
        winner: res.winner,
        gameState: newStatus,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={othelloState.gameState !== GAME_STATUS.STARTING ? styles.board : ''}>
      {othelloState.nowBoard.map((row, x) => (
        <div key={x} className='flex'>
          {row.map((val, y) => {
            const cellProps = {
              boardVal: othelloState.nowBoard[x][y],
              isReversible: pointsReversible[x][y],
              handleClick: () => handlePointClick(x, y),
            };
            return <OthelloCell key={`${x}${y}`} {...cellProps}></OthelloCell>;
          })}
        </div>
      ))}
    </div>
  );
};
