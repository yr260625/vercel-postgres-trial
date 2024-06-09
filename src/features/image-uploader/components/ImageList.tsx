import { ImageCard, ImageCardProps } from '@/features/image-uploader/components/ImageCard';
import { Api } from '@/lib/api/axios-config';

const getData = async () => {
  try {
    const response = await Api.get<ImageCardProps[]>(
      `${process.env.MY_SERVER}/api/uploaded-images`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const ImageList = async () => {
  const images = await getData();
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
      {images.map((image: ImageCardProps, idx: number) => {
        return <ImageCard {...image} key={idx}></ImageCard>;
      })}
    </div>
  );
};
