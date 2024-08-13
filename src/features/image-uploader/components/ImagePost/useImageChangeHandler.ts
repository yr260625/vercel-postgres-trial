/**
 * 入力画像変換用hooks
 */
export const useImageChangeHandler = () => {
  /**
   * 画像選択ハンドラー
   *
   * @async
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @returns {Promise<string>}
   */
  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>): Promise<string> => {
    if (e.currentTarget?.files && e.currentTarget.files[0]) {
      const targetFile: File = e.currentTarget.files[0];
      return await blobToDataUrl(targetFile);
    }
    return '';
  };

  /**
   * blobをdataUrlに変換
   *
   * @async
   * @param {Blob} file
   * @returns {Promise<string>}
   */
  const blobToDataUrl = async (file: Blob): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve('');
    });
  };

  return { handleChangeImage };
};
