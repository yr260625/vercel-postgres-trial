import { Spinner } from '@/components/ui/spinor';

export default function Loading() {
  return (
    <div className='absolute inset-0 flex items-center justify-center bg-slate-400 bg-opacity-20'>
      <Spinner size='medium' />
    </div>
  );
}
