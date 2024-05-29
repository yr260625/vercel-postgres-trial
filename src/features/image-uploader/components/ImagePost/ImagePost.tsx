'use client';

import { ModalDialog } from '@/components/layouts/dialog';
import { ImagePostForm } from './form/ImagePostForm';

export const ImagePost = () => {
  return (
    <div className='pb-2'>
      <ModalDialog openButtonTitle={'画像投稿'} modalTitle={'画像投稿フォーム'}>
        <ImagePostForm></ImagePostForm>
      </ModalDialog>
    </div>
  );
};
