import { ImageCard } from "@/app/image-uploader/components/ImageCard";
import { config } from "@/lib/config";
import { cache } from "react";
import "server-only";

export type UploadedImageProps = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export const preload = (id: string) => {
  void getData();
};

const API_SERVER_URL = config.apiPrefix + config.apiHost;

const getData = cache(async () => {
  try {
    console.log(process.env.NEXT_PUBLIC_API_PREFIX);
    console.log(config.apiPrefix);
    console.log(`${API_SERVER_URL}/api/uploaded-images`);
    const response = await fetch(`${API_SERVER_URL}/api/uploaded-images`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.headers);
    return await response.json();

    // // Test
    // const response = await axios.get(`${API_SERVER_URL}/api/uploaded-images`);
    // console.log(response.headers);
    // return await response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
});

export const ImageList = async () => {
  const images = await getData();
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {images.map((image: UploadedImageProps, idx: number) => {
        return <ImageCard {...image} key={idx}></ImageCard>;
      })}
    </div>
  );
};
