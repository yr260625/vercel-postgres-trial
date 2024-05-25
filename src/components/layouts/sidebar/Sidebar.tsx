'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export const Sidebar = () => {
  const pathname = usePathname();
  const urlList = [
    { href: '/image-uploader', name: '画像一覧' },
    { href: '/word-generator', name: '言語変換' },
    { href: '/othello', name: 'オセロ' },
  ];

  return (
    <aside className='sm:block w-48 h-full'>
      <div className='flex flex-1 flex-col overflow-y-auto'>
        {urlList.map(({ href, name }, idx) => {
          return (
            <Button asChild variant={'link'}>
              <Link
                href={href}
                key={idx}
                className='flex items-center justify-center h-12'
                prefetch={false}
              >
                <div className={pathname == href ? 'text-gray-900' : 'text-gray-400'}>
                  {name}
                </div>
              </Link>
            </Button>
          );
        })}
      </div>
    </aside>
  );
};
