import { ImageDetail } from "@/app/image-uploader/components/ImageDetail";
import { UploadedImageProps } from "@/app/image-uploader/components/ImageList";

const API_SERVER_URL = `${process.env.API_SERVER_URL}`;

export default async function Id({ params }: { params: { id: string } }) {
  const response = await fetch(`${API_SERVER_URL}/api/uploaded-images/${params.id}`);
  const images: UploadedImageProps = await response.json();
  return <ImageDetail {...images}></ImageDetail>;
}
