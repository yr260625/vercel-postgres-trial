import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { z } from 'zod';
import { uploadImage } from '@/features/image-uploader/post/actions';
import { useDataUrl } from '@/features/image-uploader/components/ImagePost/form/useDataUrl';

export const ImagePostForm = () => {
  const router = useRouter();
  const { dataUrl, handleChangeImage } = useDataUrl();

  const formSchema = z.object({
    title: z.string().min(1, {
      message: 'image title must be at least 1 characters.',
    }),
    description: z.string().min(1, {
      message: 'description must be at least 1 characters.',
    }),
    thumbnail: z.custom<File[]>(),
  });

  // Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      thumbnail: [],
    },
  });

  // Define a form submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await uploadImage({
        title: values.title,
        description: values.description,
        dataUrl,
      });

      // 成功時、modalを閉じる
      if (result.rowCount === 1) {
        router.push('/image-uploader');
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Title</FormLabel>
              <FormControl>
                <Input type='text' placeholder='***.jpg' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Image Descrptioon'
                  className='resize-none'
                  {...field}
                ></Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='thumbnail'
          render={() => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input type='file' onChange={handleChangeImage} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};
