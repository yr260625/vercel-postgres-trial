/**
 * オセロゲームの対戦状態
 */
export const GAME_STATUS = {
  STARTING: '対戦中',
  PAUSE: '一時停止',
  BEFORE_STARTING: '開始前',
  END: '終了',
} as const;
export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];

/**
 * 手番
 */
export const GAME_TURN = {
  BLACK: 1,
  WHITE: 2,
} as const;
export type GameTurnVal = (typeof GAME_TURN)[keyof typeof GAME_TURN];
export const TURN_NAME = {
  1: '黒',
  2: '白',
} as const;

/**
 * 盤面
 */
export const BOARD_CELL = {
  NONE: 0,
  BLACK: 1,
  WHITE: 2,
  WALL: 3,
} as const;
export type BoardCellVal = (typeof BOARD_CELL)[keyof typeof BOARD_CELL];

export const GRID_SIZE = 8;
export const INIT_BOARD = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
// export const GRID_SIZE = 4;
// export const INIT_BOARD = [
//   [0, 0, 0, 0],
//   [0, 1, 2, 0],
//   [0, 2, 1, 0],
//   [0, 0, 0, 0],
// ];

export type BaseErrorType = {
  type: string;
  message: string;
};
