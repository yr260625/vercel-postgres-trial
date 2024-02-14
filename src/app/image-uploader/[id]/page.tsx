// build時のfetch error回避
export const dynamic = "force-dynamic";
import { ImageDetail } from "@/app/image-uploader/components/ImageDetail";
import { config } from "@/lib/config";
import axios from "axios";

const API_SERVER_URL = config.apiPrefix + config.apiHost;

const getData = async (id: string) => {
  try {
    console.log(`${API_SERVER_URL}/api/uploaded-images/${id}`);
    const response = await fetch(`${API_SERVER_URL}/api/uploaded-images/${id}`, {
      cache: "no-store",
    });
    return await response.json();

    // // Test
    // const response = await axios.get(`${API_SERVER_URL}/api/uploaded-images/${id}`);
    // console.log(response.headers);
    // return await response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export default async function Id({ params }: { params: { id: string } }) {
  const images = await getData(params.id);
  return <ImageDetail {...images}></ImageDetail>;
}
