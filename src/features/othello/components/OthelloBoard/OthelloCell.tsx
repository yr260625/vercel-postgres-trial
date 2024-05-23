'use client';
import { memo } from 'react';
import styles from './OthelloCell.module.css';
import { BOARD_CELL } from '@/features/othello/common';

export type OthelloCellProps = {
  boardVal: number;
  isReversible: boolean;
  handleClick: Function;
};

export const OthelloCell = memo(({ boardVal, isReversible, handleClick }: OthelloCellProps) => {
  switch (boardVal) {
    case BOARD_CELL.BLACK:
      return (
        <button
          className={`${styles.board__cell} ${styles.board__stoneBlacked}`}
          disabled
        ></button>
      );
    case BOARD_CELL.WHITE:
      return (
        <button
          className={`${styles.board__cell} ${styles.board__stoneWhited}`}
          disabled
        ></button>
      );
    default:
      return (
        <button
          className={styles.board__cell}
          disabled={!isReversible}
          onClick={() => handleClick()}
        ></button>
      );
  }
});
OthelloCell.displayName = 'OthelloCell';
