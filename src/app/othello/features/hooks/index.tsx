import {
  GameStatus,
  GAME_STATUS,
  GAME_TURN,
  GameTurnVal,
  INIT_BOARD,
} from '@/app/othello/common';
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

/**
 * 各コンポーネント間で共有するオセロゲームの状態
 */
type OthelloState = {
  gameId: number;
  gameState: GameStatus;
  turnCount: number;
  nowBoard: number[][];
  nowTurn: GameTurnVal;
  winner: null | string;
};
const othelloInitState: OthelloState = {
  gameId: 0,
  gameState: GAME_STATUS.BEFORE_STARTING,
  turnCount: 0,
  nowBoard: INIT_BOARD,
  nowTurn: GAME_TURN.BLACK,
  winner: null,
};

type ProviderProps = {
  children: React.ReactNode;
};

type OthelloContextType = {
  othelloState: OthelloState;
  setOthelloState: Dispatch<SetStateAction<OthelloState>>;
};

const OthelloContext = createContext<OthelloContextType>({} as OthelloContextType);
export const OthelloProvider = ({ children }: ProviderProps) => {
  const [othelloState, setOthelloState] = useState<OthelloState>(othelloInitState);
  const value: OthelloContextType = { othelloState, setOthelloState };
  return <OthelloContext.Provider value={value}>{children}</OthelloContext.Provider>;
};

// コンポーネント間で使いまわすコンテキスト
export const useOthelloState = (): OthelloContextType => {
  return useContext(OthelloContext);
};

// 初期盤面
export const useOthelloInitState = () => {
  const [initState, _] = useState(othelloInitState);
  return { initState };
};
