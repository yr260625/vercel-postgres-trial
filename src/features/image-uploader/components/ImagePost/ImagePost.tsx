'use client';

import { NormalButton } from '@/components/layouts/ui-parts/buttons/NormalButton';
import ImagePostModal from '@/features/image-uploader/components/ImagePost/ImagePostModal';
import { useState } from 'react';

export const ImagePost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = (): void => setIsOpen(false);

  return (
    <div className='pb-2'>
      <NormalButton clickHandler={() => setIsOpen(true)}>画像投稿</NormalButton>
      <ImagePostModal isOpen={isOpen} closeModal={closeModal}></ImagePostModal>
    </div>
  );
};
