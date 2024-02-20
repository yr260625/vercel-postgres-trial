"use client";

import { uploadImage } from "@/app/image-uploader/post/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import Modal from "react-modal";
import styles from "./ImagePostModal.module.css";
Modal.setAppElement("body");

type ImagePostProps = {
  isOpen: boolean;
  closeModal: () => void;
};

type InputProps = {
  title: string;
  description: string;
  thumbnail: FileList;
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

export default function ImagePostModal({ isOpen, closeModal }: ImagePostProps) {
  const [dataUrl, setDataUrl] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<InputProps>();

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

  // cancel button
  const handleCancelButton = (e: React.MouseEvent<HTMLElement>) => {
    setDataUrl("");
    clearErrors();
    closeModal();
  };

  // save button
  const handleSaveButton: SubmitHandler<InputProps> = async (data: InputProps) => {
    try {
      console.log(data);
      const result = await uploadImage({
        title: data.title,
        description: data.description,
        dataUrl,
      });

      // 成功時、modalを閉じる
      if (result.rowCount === 1) {
        router.push("/image-uploader");
        router.refresh();
        closeModal();
      }
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <Modal className={styles.image_post_modal} isOpen={isOpen}>
      <div className="mx-auto text-sm">
        <h1 className="text-xl font-bold mb-4">画像投稿フォーム</h1>
        <form onSubmit={handleSubmit(handleSaveButton)}>
          <div className="mt-2">
            <label className="font-medium">title</label>
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset ">
              <input
                type="text"
                autoComplete="title"
                placeholder="title"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:leading-6"
                {...register("title", { required: "required!" })}
              />
            </div>
            {errors.title?.message && (
              <span className="text-red-600">{errors.title?.message}</span>
            )}
          </div>
          <div className="mt-2">
            <label className="font-medium">description</label>
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset ">
              <textarea
                placeholder="description"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:leading-6"
                {...register("description", { required: "required!" })}
              ></textarea>
            </div>
            {errors.description?.message && (
              <span className="text-red-600">{errors.description?.message}</span>
            )}
          </div>
          <div className="mt-2">
            <label className="block font-medium leading-6 text-gray-900">thumbnail</label>
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
                    <input type="file" className="sr-only" onChange={changeImage} />
                  </>
                ) : (
                  <div className="flex flex-col justify-center h-full">
                    <span className="text-indigo-600 font-semibold">Upload a file</span>
                    <input
                      type="file"
                      className="sr-only"
                      {...register("thumbnail", {
                        onChange: changeImage,
                        required: "required!",
                      })}
                    />
                    <p className="leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </div>
            </label>
            {errors.thumbnail?.message && (
              <span className="text-red-600">{errors.thumbnail?.message}</span>
            )}
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="font-semibold leading-6 text-gray-900"
              onClick={handleCancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
