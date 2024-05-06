import { GAME_TURN, GameTurnVal } from '@/app/othello/common';
import { Board } from '@/app/othello/features/domains/board';
import { Point } from '@/app/othello/features/domains/point';

export class Turn {
  readonly turnVal: GameTurnVal;
  readonly point: Point;
  private board: Board;

  constructor(turnVal: GameTurnVal, point: Point, board: Board) {
    this.turnValidation(turnVal, point, board);
    this.turnVal = turnVal;
    this.point = point;
    this.board = board;
  }

  private turnValidation(turnVal: number, point: Point, board: Board) {
    if (turnVal === null || undefined) throw new Error('The field is required');
    if (turnVal in GAME_TURN) throw new Error('The field is unknown');
    if (!board.canPut(point)) throw new Error('cannot put stone');
    return;
  }

  /**
   * 指定された座標に石を配置
   *
   * @public
   * @param {Point} point
   * @returns {void}
   */
  public putStone(point: Point): void {
    const cells = structuredClone(this.board.cells);
    cells[point.x][point.y] = this.turnVal;
    this.board = new Board(cells);
  }

  /**
   * 次ターンを取得
   *
   * @public
   * @returns {GameTurnVal}
   */
  public rotate(): GameTurnVal {
    const nextTurn = this.turnVal === GAME_TURN.BLACK ? GAME_TURN.WHITE : GAME_TURN.BLACK;
    if (!this.board.hasReversiblePoints(nextTurn)) {
      return this.turnVal;
    }
    return nextTurn;
  }

  /**
   * 配置した座標を起点に、周囲の石を裏返す
   *
   * @param {Point} startingPoint
   * @returns {void}
   */
  public reverseStone(startingPoint: Point): void {
    const reversiblePoints = this.board.findAllReversiblePoints(this.turnVal, startingPoint);
    this.board = new Board(
      this.board.cells.map((row, xIdx) => {
        return row.map((col, yIdx) => {
          for (const rPoint of reversiblePoints) {
            if (xIdx === rPoint.x && yIdx === rPoint.y) {
              return this.turnVal;
            }
          }
          return col;
        });
      })
    );
  }

  /**
   * 勝敗判定
   *
   * @returns {("" | "黒の勝ち" | "白の勝ち" | "引き分け")}
   */
  public judgeWinner = (): '' | '黒の勝ち' | '白の勝ち' | '引き分け' => {
    if (
      this.board.hasReversiblePoints(GAME_TURN.BLACK) ||
      this.board.hasReversiblePoints(GAME_TURN.WHITE)
    ) {
      return '';
    }
    const blackNum = this.board.countStone(GAME_TURN.BLACK);
    const whiteNum = this.board.countStone(GAME_TURN.WHITE);

    if (blackNum > whiteNum) {
      return '黒の勝ち';
    } else if (blackNum < whiteNum) {
      return '白の勝ち';
    }
    return '引き分け';
  };

  public getBoard(): Board {
    return this.board;
  }
}
