import { BOARD_CELL, GAME_TURN, GameTurnVal } from '@/app/othello/common';
import { Point } from '@/app/othello/features/domains/point';

export class Board {
  readonly cells: number[][];
  constructor(val: number[][]) {
    this.validation(val);
    this.cells = val;
  }

  private validation(val: number[][]) {
    val.forEach((row) => {
      row.forEach((val) => {
        if (val in BOARD_CELL) throw new Error('The board value is unknown');
      });
    });
    return;
  }

  /**
   * 指定された座標に配置可能かどうか
   *
   * @private
   * @param {Point} point
   * @returns {boolean}
   */
  public canPut(point: Point): boolean {
    const cell = this.cells[point.x][point.y];
    if (cell === BOARD_CELL.NONE) {
      return true;
    }
    return false;
  }

  /**
   * 盤面の周囲に番兵を配置
   *
   * @private
   * @returns {number[][]}
   */
  private buildSentinel(): number[][] {
    const sentinel: number[][] = [];
    const topAndBottom = Array<number>(this.cells[0].length + 2).fill(BOARD_CELL.WALL);
    sentinel.push(topAndBottom);
    this.cells.forEach((row) => {
      const walledRow = [BOARD_CELL.WALL, ...row, BOARD_CELL.WALL];
      sentinel.push(walledRow);
    });
    sentinel.push(topAndBottom);

    return sentinel;
  }

  /**
   * 指定した座標を起点に、反転対象の座標をすべて取得
   *
   * @public
   * @param {GameTurnVal} nowTurn
   * @param {Point} point
   * @returns {Point[]}
   */
  public findAllReversiblePoints(nowTurn: GameTurnVal, point: Point): Point[] {
    return [
      ...this.findReversiblePoints(nowTurn, point, -1, 0),
      ...this.findReversiblePoints(nowTurn, point, 1, 0),
      ...this.findReversiblePoints(nowTurn, point, 0, -1),
      ...this.findReversiblePoints(nowTurn, point, 0, 1),
      ...this.findReversiblePoints(nowTurn, point, 1, 1),
      ...this.findReversiblePoints(nowTurn, point, 1, -1),
      ...this.findReversiblePoints(nowTurn, point, -1, 1),
      ...this.findReversiblePoints(nowTurn, point, -1, -1),
    ];
  }

  /**
   * 特定方向の反転可能な座標を探索
   *
   * @public
   * @param {GameTurnVal} nowTurn
   * @param {Point} start
   * @param {number} xDirection
   * @param {number} yDirection
   * @returns {Point[]}
   */
  public findReversiblePoints(
    nowTurn: GameTurnVal,
    start: Point,
    xDirection: number,
    yDirection: number
  ): Point[] {
    const oppositeTurn = nowTurn === GAME_TURN.BLACK ? GAME_TURN.WHITE : GAME_TURN.BLACK;
    const sentinel = this.buildSentinel();

    let x = start.x + xDirection;
    let y = start.y + yDirection;
    let walledPoint = sentinel[x + 1][y + 1];
    const reversiblePoints = [];
    // 進行方向に石がない場合は終了
    if (walledPoint === BOARD_CELL.NONE) {
      return [];
    }

    while (true) {
      walledPoint = sentinel[x + 1][y + 1];

      // 反転可能な座標を記録
      if (walledPoint === oppositeTurn) {
        reversiblePoints.push(new Point(x, y));
      }
      // 自身の石が出現したら終了
      if (walledPoint === nowTurn) {
        break;
      }
      // 壁に到達する場合は反転できる石がないものとして終了
      if (walledPoint === BOARD_CELL.WALL) {
        reversiblePoints.splice(0);
        break;
      }
      x += xDirection;
      y += yDirection;
    }

    return reversiblePoints;
  }

  /**
   * 各座標の配置可能性を取得
   *
   * @public
   * @param {GameTurnVal} nowTurn
   * @returns {boolean[][]}
   */
  public getReversibleMatrix(nowTurn: GameTurnVal): boolean[][] {
    return this.cells.map((row, x) => {
      return row.map((val, y) => {
        const point = new Point(x, y);
        if (val !== BOARD_CELL.NONE) {
          return false;
        }
        return this.findAllReversiblePoints(nowTurn, point).length > 0;
      });
    });
  }

  /**
   * 勝敗判定
   *
   * @returns {("" | "黒の勝ち" | "白の勝ち" | "引き分け")}
   */
  public judgeWinner = (): '' | '黒の勝ち' | '白の勝ち' | '引き分け' => {
    if (
      this.hasReversiblePoints(GAME_TURN.BLACK) ||
      this.hasReversiblePoints(GAME_TURN.WHITE)
    ) {
      return '';
    }
    // 石が多いのはどちらか
    const blackNum = this.countStone(GAME_TURN.BLACK);
    const whiteNum = this.countStone(GAME_TURN.WHITE);

    if (blackNum > whiteNum) {
      return '黒の勝ち';
    } else if (blackNum < whiteNum) {
      return '白の勝ち';
    }
    return '引き分け';
  };

  /**
   * 指定した手番の配置可能性
   *
   * @public
   * @param {GameTurnVal} turn
   * @returns {boolean}
   */
  public hasReversiblePoints(turn: GameTurnVal): boolean {
    const reversiblePoints: Point[] = [];
    this.cells.forEach((row, x) => {
      row.forEach((val, y) => {
        const point = new Point(x, y);
        if (val === BOARD_CELL.NONE && this.findAllReversiblePoints(turn, point).length > 0) {
          reversiblePoints.push(point);
        }
      });
    });
    if (reversiblePoints.length > 0) {
      return true;
    }
    return false;
  }

  /**
   * 指定した手番の石の数
   *
   * @public
   * @param {GameTurnVal} turn
   * @returns {number}
   */
  public countStone(turn: GameTurnVal): number {
    return this.cells
      .reduce((pre, cur) => pre.concat(cur), [])
      .reduce((pre, cur) => {
        if (cur === turn) {
          return pre + 1;
        }
        return pre;
      }, 0);
  }
}
