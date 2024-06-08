import { Footer } from '@/components/layouts/footer';
import { Header } from '@/components/layouts/header';
import { Sidebar } from '@/components/layouts/sidebar';
import { FC, memo, ReactNode } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export const PageLayout: FC<{ children: ReactNode }> = memo(function PageLayout({ children }) {
  return (
    <div className='flex flex-col h-screen overflow-y-scroll'>
      <Header></Header>
      <div className='flex flex-1'>
        <div className='h-full hidden sm:block fixed sm:static'>
          <ScrollArea className='h-screen w-48 rounded-md'>
            <Sidebar></Sidebar>
          </ScrollArea>
        </div>
        <main className='h-full max-w-7xl p-4 bg-opacity-10 xl:m-auto'>{children}</main>
      </div>
      <Footer></Footer>
    </div>
  );
});
