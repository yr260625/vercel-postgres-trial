import { AllImageResponse } from '@/app/api/uploaded-images/route';
import { ImageList, ImageListProps } from '@/features/image-uploader/components/ImageList';
import { ImagePost } from '@/features/image-uploader/components/ImagePost/ImagePost';
import { Api } from '@/lib/api/axios-config';

// build時のfetch error回避
export const dynamic = 'force-dynamic';

const getAllImages = async () => {
  const response = await Api.get<AllImageResponse>(
    `${process.env.MY_SERVER}/api/uploaded-images`
  );
  return convertApiDataToImageListProps(response.data);
};

const convertApiDataToImageListProps = (apiData: AllImageResponse): ImageListProps => {
  return {
    images: apiData.images.map((elm) => ({
      id: elm.id,
      title: elm.title,
      thumbnail: elm.thumbnail,
      description: elm.description,
      created_at: elm.created_at,
      updated_at: elm.updated_at,
    })),
  };
};

export default async function page() {
  const images = await getAllImages();
  return (
    <>
      <ImagePost></ImagePost>
      <ImageList {...images}></ImageList>
    </>
  );
}
