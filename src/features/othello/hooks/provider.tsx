import { OTHELLO_INIT_STATE, OthelloState } from '@/features/othello/common';
import { createContext, useState, useCallback, useContext } from 'react';

type ProviderProps = {
  children: React.ReactNode;
};

// providerで共有する値の型
type StateContext = OthelloState;
type StateChangerContext = (newState: Partial<OthelloState>) => void;
const OthelloStateContext = createContext<StateContext>({} as StateContext);
const OthelloStateChangerContext = createContext<StateChangerContext>(
  {} as StateChangerContext
);

/**
 * 初期状態を取得するカスタムフック
 */
const useInitOthelloState = (): { othelloState: OthelloState; setOthelloState: any } => {
  const [othelloState, setOthelloState] = useState<OthelloState>(OTHELLO_INIT_STATE);

  // setOthelloStateをuseCallbackでメモ化する
  const memoizedSetOthelloState = useCallback((newState: Partial<OthelloState>) => {
    setOthelloState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  }, []);

  return { othelloState, setOthelloState: memoizedSetOthelloState };
};

/**
 * プロバイダで各種コンポーネントに共有
 *
 */
export const OthelloProvider = ({ children }: ProviderProps): any => {
  const { othelloState, setOthelloState } = useInitOthelloState();
  return (
    <OthelloStateContext.Provider value={othelloState}>
      <OthelloStateChangerContext.Provider value={setOthelloState}>
        {children}
      </OthelloStateChangerContext.Provider>
    </OthelloStateContext.Provider>
  );
};

/**
 * コンポーネント間で使いまわす状態および状態更新関数
 */
export const useOthelloState = () => {
  const othelloState = useContext(OthelloStateContext);
  const setOthelloState = useContext(OthelloStateChangerContext);
  return { othelloState, setOthelloState };
};
