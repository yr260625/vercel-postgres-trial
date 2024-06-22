'use client';
import { OthelloGameModeSelector } from '@/features/othello/components/OthelloGameController/OthelloGameModeSelector';
import { OthelloGameStarter } from '@/features/othello/components/OthelloGameController/OthelloGameStarter';

export const OthelloGameController = () => {
  return (
    <div className='flex justify-between items-center gap-4'>
      <OthelloGameModeSelector></OthelloGameModeSelector>
      <OthelloGameStarter></OthelloGameStarter>
      <OtherComponent></OtherComponent>
    </div>
  );
};

const OtherComponent = () => {
  console.log('render 全然関係ないコンポーネント');

  return <p>全然関係ない</p>;
};
