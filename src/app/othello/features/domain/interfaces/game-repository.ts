import { GameStatus } from '@/app/othello/common';
import { Game } from '@/app/othello/features/domain/game';

export interface IGameRepostitory {
  insert(): Promise<Game>;
  modifyStatus(game: Game): Promise<Game>;
}
