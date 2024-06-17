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

/**
 * 画像をカード形式で表示
 *
 * @param {ImageCardProps} props
 * @param {string} props.id
 * @param {string} props.title
 * @param {string} props.thumbnail
 * @param {string} props.description
 * @returns {JSX.Element}
 */
export const ImageCard = ({
  id,
  title,
  thumbnail,
  description,
}: ImageCardProps): JSX.Element => {
  return (
    <Link href={`/image-uploader/${id}`}>
      <Card className='max-w-xs hover:bg-slate-200'>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className='truncate'>{description}</CardDescription>
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
