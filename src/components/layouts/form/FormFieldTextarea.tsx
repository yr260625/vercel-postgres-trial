import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Control, FieldValues, Path } from 'react-hook-form';

export type TextareaProps<T extends FieldValues> = {
  control: Control<T, any>;
  name: Path<T>;
  label: string;
  placeholder?: string;
};

export const FormFieldTextarea = <T extends FieldValues>({
  label,
  name,
  placeholder,
  control,
}: TextareaProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} className='resize-none' {...field}></Textarea>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
