import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export type ImageCardProps = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export const ImageCard = ({ id, title, thumbnail, description }: ImageCardProps) => {
  return (
    <Link href={`/image-uploader/${id}`} className='max-w-fit'>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src={thumbnail || '/no-image.svg'}
            alt='No Image'
            width={50}
            height={50}
            className='w-auto h-full object-cover items-center hover:transition-transform hover:scale-110'
          />
        </CardContent>
      </Card>
    </Link>
  );
};
