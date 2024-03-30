'use client';
import { NormalButton } from '@/components/ui-parts/buttons/NormalButton';
import { useState } from 'react';

export const WordGenerator = () => {
  const [word, setWord] = useState('');

  const generateToughWord = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_WORD_GEN_SERVER}`);
    const res = await data.json();
    setWord(res.result);
  };
  return (
    <>
      <h1>tough-word-generator</h1>
      <div className='h-screen flex flex-col'>
        <section className='area_transform'>
          <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
            <textarea
              id='outputText'
              className='w-full md:w-1/2 h-32 border rounded-md resize-none'
              placeholder='生成した文字列'
              value={word}
              readOnly
            ></textarea>
          </div>
          <NormalButton clickHandler={generateToughWord}>生成</NormalButton>
        </section>
      </div>
    </>
  );
};
