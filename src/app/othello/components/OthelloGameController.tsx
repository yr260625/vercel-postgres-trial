'use client';
import { GAME_STATUS, GAME_TURN, GameStatus, INIT_BOARD } from '@/app/othello/common';
import { useOthelloInitState, useOthelloState } from '@/app/othello/features/hooks';
import { OthelloController } from '@/app/othello/features/controller';
import { NormalButton } from '@/components/ui-parts/buttons/NormalButton';

export const OthelloGameController = () => {
  const { othelloState, setOthelloState } = useOthelloState();
  const { initState } = useOthelloInitState();
  const controller = new OthelloController();
  console.log(othelloState);

  const handleStart = async () => {
    try {
      const { gameId } = await controller.start();
      setOthelloState({
        ...initState,
        gameId: Number(gameId),
        gameState: GAME_STATUS.STARTING,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeStatus = async (status: GameStatus) => {
    try {
      await controller.changeStatus(othelloState.gameId, status);
      setOthelloState({
        ...othelloState,
        gameState: status,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex justify-between items-center gap-4'>
      <div className='flex items-center gap-4'>
        <div>
          <input type='radio' name='turn' id='sente' />
          <label htmlFor='sente'>先手</label>
        </div>
        <div>
          <input type='radio' name='turn' id='gote' />
          <label htmlFor='gote'>後手</label>
        </div>
      </div>
      {othelloState.gameState === GAME_STATUS.STARTING ? (
        <NormalButton clickHandler={() => handleChangeStatus(GAME_STATUS.PAUSE)}>
          一時停止
        </NormalButton>
      ) : othelloState.gameState === GAME_STATUS.PAUSE ? (
        <NormalButton clickHandler={() => handleChangeStatus(GAME_STATUS.STARTING)}>
          再開
        </NormalButton>
      ) : (
        <NormalButton clickHandler={() => handleStart()}>対戦開始</NormalButton>
      )}
    </div>
  );
};
