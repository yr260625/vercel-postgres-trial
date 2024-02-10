import { ImageCard } from "@/app/image-uploader/components/ImageCard";
import { config } from "@/lib/config";

export type UploadedImageProps = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  created_at: string;
  updated_at: string;
};

const API_SERVER_URL = config.apiPrefix + config.apiHost;

export const ImageList = async () => {
  console.log(`${API_SERVER_URL}/api/uploaded-images/`);
  const response = await fetch(`${API_SERVER_URL}/api/uploaded-images`, { cache: "no-store" });
  const images: UploadedImageProps[] = await response.json();
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {images.map((image: UploadedImageProps, idx: number) => {
        return <ImageCard {...image} key={idx}></ImageCard>;
      })}
    </div>
  );
};
