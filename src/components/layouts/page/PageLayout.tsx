import { Footer } from "@/components/layouts/footer/Footer";
import { Header } from "@/components/layouts/header/Header";
import { FC, memo, ReactNode } from "react";

export const PageLayout: FC<{ children: ReactNode }> = memo(
  function PageLayout({ children }) {
    return (
      <div className="relative min-h-[100vh]">
        <Header></Header>
        <main className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          {children}
        </main>
        <Footer></Footer>
      </div>
    );
  }
);
