import { GameTurnVal, GAME_TURN } from '@/features/othello/common';
import { DomainError } from '@/features/othello/common/error/domain-error';
import { Board } from '@/features/othello/domain/board';
import { Game } from '@/features/othello/domain/game';
import { Point } from '@/features/othello/domain/point';

export class Turn {
  readonly turnVal: GameTurnVal;
  readonly turnCount: number;
  readonly game: Game;
  readonly point: Point;
  readonly board: Board;

  constructor(turnVal: GameTurnVal, turnCount: number, game: Game, point: Point, board: Board) {
    this.turnValidation(turnVal);
    this.turnVal = turnVal;
    this.turnCount = turnCount;
    this.game = game;
    this.point = point;
    this.board = board;
  }

  private turnValidation(turnVal: GameTurnVal) {
    if (turnVal === null || undefined) {
      throw new DomainError('UnexpectedValue', 'The field is required');
    }
    if (!Object.values(GAME_TURN).includes(turnVal)) {
      throw new DomainError('UnexpectedValue', 'The field is unexpected');
    }
    return;
  }

  /**
   * 次ターンの開始盤面を取得
   *
   * @public
   * @returns {Turn}
   */
  public createNextTurn(): Turn {
    // 新しい盤面を取得
    const nextBoard = this.createNextBoard();
    // ターン数増加
    const nextTurnCount = this.turnCount + 1;
    // ターン生成
    const nextTurn = new Turn(this.turnVal, nextTurnCount, this.game, this.point, nextBoard);
    // 手番交代
    return nextTurn.rotate();
  }

  /**
   * 配置した座標を起点に、周囲の石を裏返す
   *
   * @returns {Board}
   */
  public createNextBoard(): Board {
    const reversiblePoints = this.board.findAllReversiblePoints(this.turnVal, this.point);
    if (!this.board.canPut(this.point)) {
      throw new DomainError('ClickedPointIsNotEmpty', 'The point is not empty');
    }
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
   * 次ターンを取得
   *
   * @public
   * @returns {Turn}
   */
  private rotate(): Turn {
    const nextTurnVal = this.turnVal === GAME_TURN.BLACK ? GAME_TURN.WHITE : GAME_TURN.BLACK;
    if (!this.board.hasReversiblePoints(nextTurnVal)) {
      return new Turn(this.turnVal, this.turnCount, this.game, this.point, this.board);
    }
    return new Turn(nextTurnVal, this.turnCount, this.game, this.point, this.board);
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
