// build時のfetch error回避
export const dynamic = "force-dynamic";
import { ImageDetail } from "@/app/image-uploader/components/ImageDetail";
import { config } from "@/lib/config";

const API_SERVER_URL = config.apiPrefix + config.apiHost;

const getData = async (id: string) => {
  try {
    console.log(`${API_SERVER_URL}/api/uploaded-images/${id}`);
    const response = await fetch(`${API_SERVER_URL}/api/uploaded-images/${id}`);
    return await response.json();
  } catch (error) {
    console.log(error);
    return {};
  }
};

export default async function Id({ params }: { params: { id: string } }) {
  const images = await getData(params.id);
  return <ImageDetail {...images}></ImageDetail>;
}
