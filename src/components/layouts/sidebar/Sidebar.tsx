'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@radix-ui/react-scroll-area';

export const Sidebar = () => {
  const pathname = usePathname();
  const urlList = [
    { href: '/', name: 'HOME' },
    { href: '/image-uploader', name: '画像一覧' },
    { href: '/word-generator', name: '言語変換' },
    { href: '/othello', name: 'オセロ' },
  ];

  return (
    <aside className='sm:block w-48'>
      <ScrollArea>
        <div className='flex flex-1 flex-col '>
          {urlList.map(({ href, name }, idx) => {
            return (
              <Button asChild variant={'link'} key={idx}>
                <Link
                  href={href}
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
      </ScrollArea>
    </aside>
  );
};
