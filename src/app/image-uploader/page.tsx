// build時のfetch error回避
export const dynamic = "force-dynamic";
import { ImageList } from "@/app/image-uploader/components/ImageList";
import { ImagePost } from "@/app/image-uploader/components/ImagePost";

export default async function page() {
  return (
    <>
      <ImagePost></ImagePost>
      <ImageList></ImageList>
    </>
  );
}
