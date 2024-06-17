import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { uploadImage } from '@/features/image-uploader/post/actions';

// Define form data.
const formSchema = z.object({
  title: z.string().min(1, {
    message: 'image title must be at least 1 characters.',
  }),
  description: z.string().min(1, {
    message: 'description must be at least 1 characters.',
  }),
  thumbnail: z.string(),
});
export type FormData = z.infer<typeof formSchema>;

export const useImagePostForm = () => {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      thumbnail: '',
    },
  });

  // Define a form submit handler.
  const onSubmit = async (values: FormData) => {
    try {
      const result = await uploadImage(values);
      if (result) {
        router.push('/image-uploader');
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      form.reset();
    }
  };

  return { form, onSubmit, handleChangeImage };
};

// dataUrl設定
const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.currentTarget?.files && e.currentTarget.files[0]) {
    const targetFile: File = e.currentTarget.files[0];
    return await blobToDataUrl(targetFile);
  }
  return '';
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
