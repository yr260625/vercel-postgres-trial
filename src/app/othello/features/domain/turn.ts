import { GAME_TURN, GameTurnVal } from '@/app/othello/common';
import { Board } from '@/app/othello/features/domain/board';
import { Game } from '@/app/othello/features/domain/game';
import { Point } from '@/app/othello/features/domain/point';

export class Turn {
  readonly turnVal: GameTurnVal;
  readonly turnCount: number;
  readonly game: Game;
  readonly point: Point;
  readonly board: Board;

  constructor(turnVal: GameTurnVal, turnCount: number, game: Game, point: Point, board: Board) {
    this.turnValidation(turnVal, point, board);
    this.turnVal = turnVal;
    this.turnCount = turnCount;
    this.game = game;
    this.point = point;
    this.board = board;
  }

  private turnValidation(turnVal: GameTurnVal, point: Point, board: Board) {
    if (turnVal === null || undefined) throw new Error('The field is required');
    if (turnVal in GAME_TURN) throw new Error('The field is unknown');
    return;
  }

  static nextTurn(nowTurn: Turn) {
    // 石を置く
    let newBoard = nowTurn.reverseStone();
    // 手番交代判定
    const nextTurn = nowTurn.rotate();
    const nextTurnCount = nowTurn.turnCount + 1;

    return new Turn(nextTurn, nextTurnCount, nowTurn.game, nowTurn.point, newBoard);
  }

  /**
   * 指定された座標に石を配置
   *
   * @public
   * @param {Point} point
   * @returns {Board}
   */
  public putStone(point: Point): Board {
    const cells = structuredClone(this.board.cells);
    cells[point.x][point.y] = this.turnVal;
    return new Board(cells);
  }

  /**
   * 次ターンを取得
   *
   * @public
   * @returns {GameTurnVal}
   */
  public rotate(): GameTurnVal {
    const nextTurnVal = this.turnVal === GAME_TURN.BLACK ? GAME_TURN.WHITE : GAME_TURN.BLACK;
    if (!this.board.hasReversiblePoints(nextTurnVal)) {
      return this.turnVal;
    }
    return nextTurnVal;
  }

  /**
   * 配置した座標を起点に、周囲の石を裏返す
   *
   * @param {Point} startingPoint
   * @returns {Board}
   */
  public reverseStone(): Board {
    const reversiblePoints = this.board.findAllReversiblePoints(this.turnVal, this.point);
    if (!this.board.canPut(this.point)) throw new Error('cannot put stone');
    const cells = structuredClone(this.board.cells);
    cells[this.point.x][this.point.y] = this.turnVal;
    return new Board(
      cells.map((row, xIdx) => {
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
}
