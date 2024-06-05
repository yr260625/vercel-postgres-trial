import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

export type InputProps<T extends FieldValues> = {
  control: Control<T, any>;
  name: Path<T>;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
};

export const FormFieldInputImage = <T extends FieldValues>({
  label,
  name,
  placeholder,
  control,
  onChange,
}: InputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, ...fieldProps } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type='file'
              placeholder={placeholder}
              onChange={(event) => onChange(event)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
