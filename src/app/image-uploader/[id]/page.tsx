import { ImageDetail } from '@/features/image-uploader/components/ImageDetail/ImageDetail';

// build時のfetch error回避
export const dynamic = 'force-dynamic';

const getData = async (id: string) => {
  try {
    const response = await fetch(`${process.env.MY_SERVER}/api/uploaded-images/${id}`, {
      cache: 'no-store',
    });
    return await response.json();
  } catch (error) {
    window.alert(error);
    return {};
  }
};

export default async function Id({ params }: { params: { id: string } }) {
  const images = await getData(params.id);
  return <ImageDetail {...images}></ImageDetail>;
}
