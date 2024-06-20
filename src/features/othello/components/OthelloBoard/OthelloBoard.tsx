'use client';
import React from 'react';
import styles from './OthelloBoard.module.css';
import { GAME_STATUS } from '@/features/othello/common';
import { OthelloCell } from '@/features/othello/components/OthelloBoard/OthelloCell';
import { useCellClick } from './useCellClick';

export const OthelloBoard = () => {
  const { othelloState, pointsReversible, memonizedCellClick } = useCellClick();

  return (
    <div className={othelloState.gameState !== GAME_STATUS.STARTING ? styles.board : ''}>
      {othelloState.nowBoard.map((row, x) => (
        <div key={x} className='flex'>
          {row.map((val, y) => {
            return (
              <OthelloCell
                key={`${x}${y}`}
                boardVal={othelloState.nowBoard[x][y]}
                isReversible={pointsReversible[x][y]}
                handleClick={memonizedCellClick.bind(null, othelloState, x, y)}
              ></OthelloCell>
            );
          })}
        </div>
      ))}
    </div>
  );
};
