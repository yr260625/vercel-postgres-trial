'use client';

type props = { clickHandler: () => void; children: React.ReactNode };

export const NormalButton = ({ clickHandler, children }: props) => {
  return (
    <button
      type='button'
      className='w-24 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};
