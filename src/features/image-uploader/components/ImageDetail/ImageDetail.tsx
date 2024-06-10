import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

export type ImageDetailProps = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export const ImageDetail = ({
  title,
  description,
  created_at,
  updated_at,
  thumbnail,
}: ImageDetailProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <div>
        <Label htmlFor='title'>タイトル</Label>
        <Input readOnly id='title' defaultValue={title} className='w-full truncate'></Input>
      </div>
      <div>
        <Label htmlFor='description'>説明</Label>
        <Textarea readOnly id='description' defaultValue={description}></Textarea>
      </div>
      <div>
        <Label htmlFor='created_at'>登録日時</Label>
        <Input readOnly id='created_at' defaultValue={created_at}></Input>
      </div>
      <div>
        <Label htmlFor='updated_at'>更新日時</Label>
        <Input readOnly id='updated_at' defaultValue={updated_at}></Input>
      </div>
      <div>
        <Label htmlFor='thumbnail'>画像</Label>
        <div className='w-full h-[480px] border-spacing-4 rounded-md border border-input bg-background'>
          <Image
            src={thumbnail}
            alt='No Image'
            width={100}
            height={100}
            className='w-full h-full object-contain'
            id='thumbnail'
          ></Image>
        </div>
      </div>
    </div>
  );
};
