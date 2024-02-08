import { Footer } from "@/components/layouts/footer/Footer";
import { Header } from "@/components/layouts/header/Header";
import { Sidebar } from "@/components/layouts/sidebar/Sidebar";
import { FC, memo, ReactNode } from "react";

export const PageLayout: FC<{ children: ReactNode }> = memo(function PageLayout({ children }) {
  return (
    <div className="flex flex-col relative  h-screen">
      <Header></Header>
      <div className="flex flex-1">
        <Sidebar></Sidebar>
        <main className="flex-1 h-full max-w-[1280px] p-8 bg-gray-400 bg-opacity-10">
          {children}
        </main>
      </div>
      <Footer></Footer>
    </div>
  );
});
