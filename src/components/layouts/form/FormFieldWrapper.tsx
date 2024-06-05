import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ReactNode } from 'react';
import { Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

export type Props<T extends FieldValues> = {
  control: Control<T, any>;
  name: Path<T>;
  label: string;
  children: (field: ControllerRenderProps<T, Path<T>>) => ReactNode;
};

export const FormFieldWrapper = <T extends FieldValues>({
  control,
  name,
  label,
  children,
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>{children(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
