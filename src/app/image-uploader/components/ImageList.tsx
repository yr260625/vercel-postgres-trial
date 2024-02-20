import { ImageCard } from "@/app/image-uploader/components/ImageCard";

export type UploadedImageProps = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  created_at: string;
  updated_at: string;
};

const getData = async () => {
  try {
    const response = await fetch(`${process.env.MY_SERVER}/api/uploaded-images`, {
      cache: "no-store",
    });
    return await response.json();
  } catch (error) {
    window.alert(error);
    return [];
  }
};

export const ImageList = async () => {
  const images = await getData();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((image: UploadedImageProps, idx: number) => {
        return <ImageCard {...image} key={idx}></ImageCard>;
      })}
    </div>
  );
};
