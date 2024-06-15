import { ImageCard, ImageCardProps } from '@/features/image-uploader/components/ImageCard';

export type ImageListProps = { images: ImageCardProps[] };

export const ImageList = ({ images }: ImageListProps) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
      {images.map((image: ImageCardProps, idx: number) => {
        return <ImageCard {...image} key={idx}></ImageCard>;
      })}
    </div>
  );
};
