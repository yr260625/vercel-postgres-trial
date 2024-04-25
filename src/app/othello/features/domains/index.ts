import { GAME_TURN, Point, Turn } from '@/app/othello/common';
import { DB } from '@/libs/postgres';

export const findCurrentBoardById = async (db: DB, gameId: number) => {
  const result = await db.execute(
    `select * from othello_boards where game_id=${gameId} order by turn_count desc`
  );
  return JSON.parse(result[0].board_configuration);
};

export const canPut = (board: number[][], point: Point) => {
  const cell = board[point.x][point.y];
  if (cell === GAME_TURN.NONE) {
    return true;
  }
  return false;
};

// 全方向への反転可能点の探索
export const getFlippablePointsAll = (walledBoard: number[][], nowTurn: Turn, point: Point) => {
  return [
    ...exploreFlippablePoints(walledBoard, nowTurn, point, -1, 0),
    ...exploreFlippablePoints(walledBoard, nowTurn, point, 1, 0),
    ...exploreFlippablePoints(walledBoard, nowTurn, point, 0, -1),
    ...exploreFlippablePoints(walledBoard, nowTurn, point, 0, 1),
    ...exploreFlippablePoints(walledBoard, nowTurn, point, 1, 1),
    ...exploreFlippablePoints(walledBoard, nowTurn, point, 1, -1),
    ...exploreFlippablePoints(walledBoard, nowTurn, point, -1, 1),
    ...exploreFlippablePoints(walledBoard, nowTurn, point, -1, -1),
  ];
};

// 特定方向への反転可能点の探索
export const exploreFlippablePoints = (
  walledBoard: number[][],
  nowTurn: Turn,
  start: Point,
  xDirection: number,
  yDirection: number
) => {
  const oppositeTurn = nowTurn === GAME_TURN.BLACK ? GAME_TURN.WHITE : GAME_TURN.BLACK;

  let x = start.x + xDirection;
  let y = start.y + yDirection;
  let walledPoint = walledBoard[x + 1][y + 1];
  const flippablePoints = [];

  // 進行方向に石がない場合は終了
  if (walledPoint === GAME_TURN.NONE) {
    return [];
  }

  while (true) {
    walledPoint = walledBoard[x + 1][y + 1];

    // 反転可能な座標を記録
    if (walledPoint === oppositeTurn) {
      flippablePoints.push({ x, y });
    }
    // 自身の石が出現したら終了
    if (walledPoint === nowTurn) {
      break;
    }
    // 壁に到達する場合は反転できる石がないものとして終了
    if (walledPoint === GAME_TURN.WALL) {
      flippablePoints.splice(0);
      break;
    }
    x += xDirection;
    y += yDirection;
  }

  return flippablePoints;
};

// 番兵
export const getwalledBoard = (board: number[][]) => {
  const walldBoard: number[][] = [];
  const topAndBottom = Array<number>(board[0].length + 2).fill(GAME_TURN.WALL);
  walldBoard.push(topAndBottom);
  board.forEach((row) => {
    const walledRow = [GAME_TURN.WALL, ...row, GAME_TURN.WALL];
    walldBoard.push(walledRow);
  });
  walldBoard.push(topAndBottom);

  return walldBoard;
};

export const reverseStoneOnBoard = (
  board: number[][],
  nowTurn: number,
  startingPoint: Point,
  flippablePoints: Point[]
) => {
  return board.map((row, xIdx) => {
    return row.map((col, yIdx) => {
      if (xIdx === startingPoint.x && yIdx === startingPoint.y) {
        return nowTurn;
      }
      for (const rPoint of flippablePoints) {
        if (xIdx === rPoint.x && yIdx === rPoint.y) {
          return nowTurn;
        }
      }

      return col;
    });
  });
};

// 指定した手番において、空白の座標が配置可能かどうか
export const hasFilippablePoints = (board: number[][], turn: Turn) => {
  const flippablePoints: Point[] = [];
  const walledBoard = getwalledBoard(board);
  board.forEach((row, x) => {
    row.forEach((val, y) => {
      const point = { x, y };
      if (
        val === GAME_TURN.NONE &&
        getFlippablePointsAll(walledBoard, turn, point).length > 0
      ) {
        flippablePoints.push(point);
      }
    });
  });
  if (flippablePoints.length > 0) {
    return true;
  }
  return false;
};

export const judgeWinner = (board: number[][]) => {
  // 石が多いのはどちらか
  const blackNum = board
    .reduce((pre, cur) => pre.concat(cur), [])
    .reduce((pre, cur) => {
      if (cur === GAME_TURN.BLACK) {
        return pre + 1;
      }
      return pre;
    }, 0);
  const whiteNum = board
    .reduce((pre, cur) => pre.concat(cur), [])
    .reduce((pre, cur) => {
      if (cur === GAME_TURN.WHITE) {
        return pre + 1;
      }
      return pre;
    }, 0);

  if (blackNum > whiteNum) {
    return '黒の勝ち';
  } else if (blackNum < whiteNum) {
    return '白の勝ち';
  }
  return '引き分け';
};

// 全座標の配置可能性を取得する
export const getFlippableMatrix = (board: number[][], nowTurn: Turn) => {
  const walledBoard = getwalledBoard(board);
  return board.map((row, x) => {
    return row.map((val, y) => {
      const point = { x, y };
      if (val !== GAME_TURN.NONE) {
        return false;
      }
      return getFlippablePointsAll(walledBoard, nowTurn, point).length > 0;
    });
  });
};

export const createNextBoard = async (
  db: DB,
  gameId: number,
  nowTurnCount: number,
  nextBoard: number[][]
) => {
  const result = await db.execute(
    `insert into 
    othello_boards(game_id, turn_count, board_configuration) 
    values ($1, $2, $3)
    returning board_configuration`,
    [gameId, nowTurnCount, JSON.stringify(nextBoard)]
  );

  return result[0].board_configuration;
};

export const createNextTurn = async (db: DB, gameId: number, nowTurnCount: number) => {
  const result = await db.execute(
    `insert into 
    othello_turns(game_id, turn_count, end_at) 
    values ($1, $2, current_timestamp)
    returning turn_count`,
    [gameId, nowTurnCount]
  );

  return result[0].turn_count;
};

export const createNextMove = async (
  db: DB,
  gameId: number,
  nowTurnCount: number,
  nowTurn: number,
  point: Point
) => {
  const result = await db.execute(
    `insert into 
    othello_moves(game_id, turn_count, now_turn, x, y) 
    values ($1, $2, $3, $4, $5)
    returning turn_count`,
    [gameId, nowTurnCount, nowTurn, point.x, point.y]
  );

  return result[0].turn_count;
};
