import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { uploadImage } from '@/features/image-uploader/post/actions';

/**
 * 投稿画像フォームデータ
 */
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

/**
 * 画像投稿フォーム用hooks
 */
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

  return { form, onSubmit };
};
