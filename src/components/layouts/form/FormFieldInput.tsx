import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { HTMLInputTypeAttribute } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

export type InputProps<T extends FieldValues> = {
  control: Control<T, any>;
  name: Path<T>;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
};

export const FormFieldInput = <T extends FieldValues>({
  label,
  name,
  type = 'text',
  placeholder,
  control,
}: InputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
