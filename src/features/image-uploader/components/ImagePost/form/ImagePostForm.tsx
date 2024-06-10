import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormFieldWrapper } from '@/components/layouts/form/FormFieldWrapper';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ControllerRenderProps } from 'react-hook-form';
import { useImagePostForm } from './useImagePostForm';
import type { FormData } from './useImagePostForm';

export const ImagePostForm = () => {
  const { form, onSubmit, handleChangeImage } = useImagePostForm();
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
          children={(field: ControllerRenderProps<FormData>) => {
            const { value, onChange, ...fieldProps } = field;
            return (
              <Input
                type='file'
                {...fieldProps}
                onChange={async (event) => {
                  const dataUrl = await handleChangeImage(event);
                  onChange(dataUrl);
                }}
              />
            );
          }}
        ></FormFieldWrapper>
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};
