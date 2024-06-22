import { OTHELLO_INIT_STATE, OthelloState } from '@/features/othello/common';
import { createContext, useState, useCallback, useContext } from 'react';

type ProviderProps = {
  children: React.ReactNode;
};

type OthelloContextType = {
  othelloState: OthelloState;
  setOthelloState: (newState: Partial<OthelloState>) => void;
};

const OthelloContext = createContext<OthelloContextType>({} as OthelloContextType);
export const OthelloProvider = ({ children }: ProviderProps) => {
  const [othelloState, setOthelloState] = useState<OthelloState>(OTHELLO_INIT_STATE);

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
