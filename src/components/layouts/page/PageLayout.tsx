import { Footer } from "@/components/layouts/footer/Footer";
import { Header } from "@/components/layouts/header/Header";
import { Sidebar } from "@/components/layouts/sidebar/Sidebar";
import { FC, memo, ReactNode } from "react";

export const PageLayout: FC<{ children: ReactNode }> = memo(function PageLayout({ children }) {
  return (
    <div className="flex flex-col relative h-screen">
      <div className="sticky top-0 z-50">
        <Header></Header>
      </div>
      <div className="flex flex-1 ">
        <div className="h-full hidden sm:block fixed sm:static">
          <Sidebar></Sidebar>
        </div>
        <main className="flex-1 h-full max-w-7xl p-4 bg-opacity-10 xl:m-auto">{children}</main>
      </div>
      <Footer></Footer>
    </div>
  );
});
