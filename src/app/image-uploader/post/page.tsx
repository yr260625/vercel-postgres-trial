"use client";

import { uploadImage } from "@/app/image-uploader/post/actions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Post() {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [dataUrl, setDataUrl] = useState("");

  // upload file
  const changeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget?.files && e.currentTarget.files[0]) {
      // POSTする画像を取得
      const targetFile: File = e.currentTarget.files[0];

      // サムネイル表示
      const dataUrl = await blobToDataUrl(targetFile);
      setDataUrl(dataUrl);
    }
  };

  // blobをdataUrlに変換
  const blobToDataUrl = async (file: Blob): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve("");
    });
  };

  // cancel button
  const handleCancelButton = (e: React.MouseEvent<HTMLElement>) => {
    setDataUrl("");
    if (titleRef.current) {
      titleRef.current.value = "";
    }
  };

  const router = useRouter();

  // save button
  const handleSaveButton = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (titleRef.current) {
      await uploadImage({
        title: titleRef.current.value,
        thumbnail: dataUrl,
        description: descriptionRef!.current!.value,
      });

      router.push("/image-uploader");
      router.refresh();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-4 bg-white p-6 rounded shadow-md">
      <h1 className="text-xl font-bold mb-4">画像投稿フォーム</h1>
      <form>
        <div className="mt-2">
          <label className="block text-sm font-medium">title</label>
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset ">
            <input
              type="text"
              name="title"
              autoComplete="title"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="title"
              ref={titleRef}
            />
          </div>
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium">description</label>
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset ">
            <textarea
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="description"
              ref={descriptionRef}
            ></textarea>
          </div>
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">thumbnail</label>
          <label className="relative cursor-pointer rounded-md">
            <div className="flex justify-center h-48 rounded-lg border border-dashed border-gray-900/25 text-center overflow-hidden">
              {dataUrl ? (
                <>
                  <Image
                    src={dataUrl}
                    alt="No Image"
                    width={100}
                    height={100}
                    className="w-auto h-full object-cover items-center hover:transition-transform hover:scale-110"
                  />
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={changeImage}
                  />
                </>
              ) : (
                <div className="flex flex-col justify-center h-full">
                  <span className="text-indigo-600 font-semibold">Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={changeImage}
                  />
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          </label>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={handleCancelButton}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSaveButton}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
