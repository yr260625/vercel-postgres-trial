// build時のfetch error回避
export const dynamic = 'force-dynamic';
import { ImageDetail } from '@/app/image-uploader/components/ImageDetail';

const getData = async (id: string) => {
  try {
    const response = await fetch(`${process.env.MY_SERVER}/api/uploaded-images/${id}`, {
      cache: 'no-store',
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return {};
  }
};

export default async function Id({ params }: { params: { id: string } }) {
  const images = await getData(params.id);
  return <ImageDetail {...images}></ImageDetail>;
}
