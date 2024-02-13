// build時のfetch error回避
export const dynamic = "force-dynamic";
import { ImageDetail } from "@/app/image-uploader/components/ImageDetail";
import { UploadedImageProps } from "@/app/image-uploader/components/ImageList";
import { config } from "@/lib/config";

const API_SERVER_URL = config.apiPrefix + config.apiHost;

export default async function Id({ params }: { params: { id: string } }) {
  const response = await fetch(`${API_SERVER_URL}/api/uploaded-images/${params.id}`);
  const images: UploadedImageProps = await response.json();
  return <ImageDetail {...images}></ImageDetail>;
}
