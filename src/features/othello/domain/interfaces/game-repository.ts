import { Game } from '@/features/othello/domain/game';

export interface IGameRepostitory {
  insert(): Promise<Game>;
  modifyStatus(game: Game): Promise<Game>;
}
