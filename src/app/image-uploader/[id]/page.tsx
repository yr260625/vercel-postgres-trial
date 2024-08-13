import { ImageResponse } from '@/app/api/uploaded-images/[id]/route';
import {
  ImageDetailProps,
  ImageDetail,
} from '@/features/image-uploader/components/ImageDetail';
import { Api } from '@/lib/api/axios-config';

// build時のfetch error回避
export const dynamic = 'force-dynamic';

const getData = async (id: string): Promise<ImageResponse | void> => {
  try {
    const response = await Api.get<ImageDetailProps>(
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
  return <div>no image!!</div>;
}
