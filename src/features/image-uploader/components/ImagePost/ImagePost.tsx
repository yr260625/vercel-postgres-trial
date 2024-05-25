'use client';

import { Button } from '@/components/ui/button';
import ImagePostModal from '@/features/image-uploader/components/ImagePost/ImagePostModal';
import { useState } from 'react';

export const ImagePost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = (): void => setIsOpen(false);

  return (
    <div className='pb-2'>
      <Button onClick={() => setIsOpen(true)}>画像投稿</Button>
      <ImagePostModal isOpen={isOpen} closeModal={closeModal}></ImagePostModal>
    </div>
  );
};
