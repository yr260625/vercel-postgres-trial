'use client';

import ImagePostModal from '@/features/image-uploader/components/ImagePost/ImagePostModal';
import { useState } from 'react';

export const ImagePost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = (): void => setIsOpen(false);

  return (
    <div className='pb-2'>
      <button
        type='button'
        className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800'
        onClick={() => setIsOpen(true)}
      >
        画像投稿
      </button>
      <ImagePostModal isOpen={isOpen} closeModal={closeModal}></ImagePostModal>
    </div>
  );
};
