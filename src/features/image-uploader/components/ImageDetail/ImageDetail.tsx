import { UploadedImageProps } from '@/features/image-uploader/components/ImageList';
import Image from 'next/image';

export const ImageDetail = (props: UploadedImageProps) => {
  return (
    <div className='p-4'>
      <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white'>
        {props.title}
      </h3>
      <p className='mt-3'>{props.description}</p>
      <p className='mt-3'>{props.created_at}</p>
      <p className='mt-3'>{props.updated_at || 'test'}</p>
      <div className='mt-3 w-full'>
        <Image src={props.thumbnail} alt='No Image' width={100} height={100}></Image>
      </div>
    </div>
  );
};
