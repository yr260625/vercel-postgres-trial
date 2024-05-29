import Image from 'next/image';
import Link from 'next/link';
import styles from './ImageCard.module.css';
import { UploadedImageProps } from '@/features/image-uploader/components/ImageList';

export const ImageCard = ({ id, title, thumbnail, description }: UploadedImageProps) => {
  return (
    <Link href={`/image-uploader/${id}`} className='max-w-fit'>
      <div className='max-w-[240px] group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]'>
        <div className='p-4'>
          <Image
            src={thumbnail || '/no-image.svg'}
            alt='No Image'
            width={50}
            height={50}
            className='w-auto h-full object-cover items-center hover:transition-transform hover:scale-110'
          />
        </div>
        <div className='flex flex-col justify-center gap-1 p-4'>
          <h3 className='font-semibold text-xl text-gray-800 dark:text-gray-300'>{title}</h3>
          <div className={styles.multiline_truncate}>{description}</div>
        </div>
      </div>
    </Link>
  );
};
