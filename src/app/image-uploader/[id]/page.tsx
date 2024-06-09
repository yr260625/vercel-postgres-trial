import { ImageCardProps } from '@/features/image-uploader/components/ImageCard';
import { ImageDetail } from '@/features/image-uploader/components/ImageDetail/ImageDetail';
import { Api } from '@/lib/api/axios-config';

// build時のfetch error回避
export const dynamic = 'force-dynamic';

const getData = async (id: string): Promise<ImageCardProps | void> => {
  try {
    const response = await Api.get<ImageCardProps>(
      `${process.env.MY_SERVER}/api/uploaded-images/${id}`
    );
    return response.data;
  } catch (error) {
    return;
  }
};

export default async function Id({ params }: { params: { id: string } }) {
  const image = await getData(params.id);
  if (image) {
    return <ImageDetail {...image}></ImageDetail>;
  }
  return <div>nothing!</div>;
}
