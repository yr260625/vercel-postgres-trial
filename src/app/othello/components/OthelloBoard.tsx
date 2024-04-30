'use client';
import React from 'react';
import styles from './OthelloBoard.module.css';
import { OthelloController } from '@/app/othello/features/controllers';
import { GAME_STATUS, GAME_TURN } from '@/app/othello/common';
import { getFlippableMatrix } from '@/app/othello/features/domains';
import { useOthelloState } from '@/app/othello/features/hooks';

export const OthelloBoard = () => {
  const { othelloState, setOthelloState } = useOthelloState();
  const pointsFlippable = getFlippableMatrix(othelloState.nowBoard, othelloState.nowTurn);
  console.log(othelloState.winner);

  const handlePointClick = async (x: number, y: number) => {
    try {
      // 石を置く
      const controller = new OthelloController();
      const res = await controller.putStone(
        othelloState.gameId,
        othelloState.nowTurn,
        othelloState.turnCount,
        x,
        y
      );
      const newStatus = res.winner ? GAME_STATUS.BEFORE_STARTING : othelloState.gameState;
      console.log(res);
      setOthelloState({
        ...othelloState,
        turnCount: othelloState.turnCount + 1,
        nowBoard: res.nextBoard,
        nowTurn: res.nextTurn,
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
              case GAME_TURN.NONE:
                return (
                  <button
                    key={`${x}${y}`}
                    className={styles.board__cell}
                    disabled={!pointsFlippable[x][y]}
                    onClick={() => handlePointClick(x, y)}
                  ></button>
                );
              case GAME_TURN.BLACK:
                return (
                  <button
                    key={`${x}${y}`}
                    className={`${styles.board__cell} ${styles.board__stoneBlacked}`}
                    disabled
                  ></button>
                );
              case GAME_TURN.WHITE:
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
