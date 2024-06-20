import {
  GAME_STATUS,
  GAME_TURN,
  GameStatus,
  GameTurnVal,
  INIT_BOARD,
} from '@/features/othello/common';
import { createContext, useCallback, useContext, useState } from 'react';

/**
 * 各コンポーネント間で共有するオセロゲームの状態
 */
export type OthelloState = {
  gameId: number;
  gameState: GameStatus;
  nowTurnVal: GameTurnVal;
  nowTurnCount: number;
  nowBoard: number[][];
  winner: null | string;
};
const othelloInitState: OthelloState = {
  gameId: 0,
  gameState: GAME_STATUS.BEFORE_STARTING,
  nowTurnVal: GAME_TURN.BLACK,
  nowTurnCount: 0,
  nowBoard: INIT_BOARD,
  winner: null,
};

type ProviderProps = {
  children: React.ReactNode;
};

type OthelloContextType = {
  othelloState: OthelloState;
  setOthelloState: (newState: Partial<OthelloState>) => void;
};

const OthelloContext = createContext<OthelloContextType>({} as OthelloContextType);
export const OthelloProvider = ({ children }: ProviderProps) => {
  const [othelloState, setOthelloState] = useState<OthelloState>(othelloInitState);

  // setOthelloStateをuseCallbackでメモ化する
  const memoizedSetOthelloState = useCallback((newState: Partial<OthelloState>) => {
    setOthelloState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  }, []);

  // Providerで各コンポーネントに配る
  const value: OthelloContextType = {
    othelloState,
    setOthelloState: memoizedSetOthelloState,
  };
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
