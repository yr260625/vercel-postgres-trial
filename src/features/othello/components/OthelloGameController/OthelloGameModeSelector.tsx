'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const OthelloGameModeSelector = () => {
  return (
    <Select>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Mode' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='solo'>SOLO</SelectItem>
        <SelectItem value='vs'>VS CPU</SelectItem>
      </SelectContent>
    </Select>
  );
};
