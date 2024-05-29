import { useState } from 'react';

export const useDataUrl = () => {
  const [dataUrl, setDataUrl] = useState('');

  // dataUrl設定
  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget?.files && e.currentTarget.files[0]) {
      const targetFile: File = e.currentTarget.files[0];
      const dataUrl = await blobToDataUrl(targetFile);
      setDataUrl(dataUrl);
    }
  };

  // dataUrl初期化
  const clearDataUrl = () => {
    setDataUrl('');
  };

  // blobをdataUrlに変換
  const blobToDataUrl = async (file: Blob): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve('');
    });
  };

  return { dataUrl, handleChangeImage, clearDataUrl };
};
