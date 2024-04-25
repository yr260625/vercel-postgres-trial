/**
 * オセロゲームの対戦状態
 */
export type GameStatus = '対戦中' | '一時停止' | '開始前' | '終了';
type GameStatusObject = {
  STARTING: GameStatus;
  PAUSE: GameStatus;
  BEFORE_STARTING: GameStatus;
  END: GameStatus;
};
export const GAME_STATUS: GameStatusObject = {
  STARTING: '対戦中',
  PAUSE: '一時停止',
  BEFORE_STARTING: '開始前',
  END: '終了',
};

/**
 * 手番
 */
export type Turn = 0 | 1 | 2 | 3;
type GameTurn = {
  NONE: Turn;
  BLACK: Turn;
  WHITE: Turn;
  WALL: Turn;
};
export const GAME_TURN: GameTurn = {
  NONE: 0,
  BLACK: 1,
  WHITE: 2,
  WALL: 3,
};
export const TURN_NAME = {
  0: '',
  1: '黒',
  2: '白',
  3: '壁',
};
// export const INIT_BOARD = [
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 1, 2, 0, 0, 0],
//   [0, 0, 0, 2, 1, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
// ];
export const INIT_BOARD = [
  [0, 0, 0, 0],
  [0, 1, 2, 0],
  [0, 2, 1, 0],
  [0, 0, 0, 0],
];

/**
 * 座標
 */
export type Point = {
  x: number;
  y: number;
};
