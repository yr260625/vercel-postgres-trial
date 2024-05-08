'use client';
import React from 'react';
import styles from './OthelloBoard.module.css';
import { OthelloController } from '@/app/othello/features/controller';
import { BOARD_CELL, GAME_STATUS, GAME_TURN } from '@/app/othello/common';
import { useOthelloState } from '@/app/othello/features/hooks';
import { Board } from '@/app/othello/features/domain/board';

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
      window.alert(error);
    }
  };

  return (
    <div className={othelloState.gameState !== GAME_STATUS.STARTING ? styles.board : ''}>
      {othelloState.nowBoard.map((row, x) => (
        <div key={x} className='flex'>
          {row.map((val, y) => {
            switch (othelloState.nowBoard[x][y]) {
              case BOARD_CELL.NONE:
                return (
                  <button
                    key={`${x}${y}`}
                    className={styles.board__cell}
                    disabled={!pointsReversible[x][y]}
                    onClick={() => handlePointClick(x, y)}
                  ></button>
                );
              case BOARD_CELL.BLACK:
                return (
                  <button
                    key={`${x}${y}`}
                    className={`${styles.board__cell} ${styles.board__stoneBlacked}`}
                    disabled
                  ></button>
                );
              case BOARD_CELL.WHITE:
                return (
                  <button
                    key={`${x}${y}`}
                    className={`${styles.board__cell} ${styles.board__stoneWhited}`}
                    disabled
                  ></button>
                );
            }
          })}
        </div>
      ))}
    </div>
  );
};
