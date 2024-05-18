import { ImageList } from '@/features/image-uploader/components/ImageList';
import { ImagePost } from '@/features/image-uploader/components/ImagePost/ImagePost';

// build時のfetch error回避
export const dynamic = 'force-dynamic';

export default async function page() {
  return (
    <>
      <ImagePost></ImagePost>
      <ImageList></ImageList>
    </>
  );
}
