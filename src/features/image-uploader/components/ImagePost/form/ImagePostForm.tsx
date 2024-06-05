import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { z } from 'zod';
import { uploadImage } from '@/features/image-uploader/post/actions';
import { useDataUrl } from '@/features/image-uploader/components/ImagePost/form/useDataUrl';
import { FormFieldWrapper } from '@/components/layouts/form/FormFieldWrapper';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
    thumbnail: z.string(),
  });

  // Define form.
  type FormData = z.infer<typeof formSchema>;

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
      const result = await uploadImage({
        title: values.title,
        description: values.description,
        dataUrl,
      });

      // 成功時、modalを閉じる
      if (result) {
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
        <FormFieldWrapper
          control={form.control}
          name={'title'}
          label={'title'}
          children={(field: ControllerRenderProps<FormData>) => {
            return <Input type={'text'} placeholder={'title'} {...field} />;
          }}
        ></FormFieldWrapper>
        <FormFieldWrapper
          control={form.control}
          name={'description'}
          label={'descrptioon'}
          children={(field: ControllerRenderProps<FormData>) => {
            return (
              <Textarea
                placeholder={'description'}
                className='resize-none'
                {...field}
              ></Textarea>
            );
          }}
        ></FormFieldWrapper>
        <FormFieldWrapper
          control={form.control}
          name={'thumbnail'}
          label={'thumbnail'}
          children={() => {
            return <Input type='file' onChange={(event) => handleChangeImage(event)} />;
          }}
        ></FormFieldWrapper>
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};
