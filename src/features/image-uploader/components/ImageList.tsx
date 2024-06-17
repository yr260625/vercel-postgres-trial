import { ImageCard, ImageCardProps } from '@/features/image-uploader/components/ImageCard';

export type ImageListProps = { images: ImageCardProps[] };

/**
 * 投稿した画像をカード一覧で表示
 *
 * @param {ImageListProps} images 画像一覧
 * @returns {JSX.Element}
 */
export const ImageList = ({ images }: ImageListProps): JSX.Element => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
      {images.map((image: ImageCardProps, idx: number) => {
        return <ImageCard {...image} key={idx}></ImageCard>;
      })}
    </div>
  );
};
