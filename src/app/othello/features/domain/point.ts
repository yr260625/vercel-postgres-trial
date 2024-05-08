import { GRID_SIZE } from '@/app/othello/common';

export class Point {
  readonly x: number;
  readonly y: number;
  constructor(x: number, y: number) {
    this.validation(x, y);
    this.x = x;
    this.y = y;
  }

  private validation(x: number, y: number) {
    if (x === null || undefined) throw new Error('The field is required');
    if (y === null || undefined) throw new Error('The field is required');
    if (x < 0 || x > GRID_SIZE) throw new Error('The field is out of range');
    if (y < 0 || y > GRID_SIZE) throw new Error('The field is out of range');
    return;
  }
}
