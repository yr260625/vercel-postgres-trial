import { Footer } from "@/components/layouts/footer/Footer";
import { Header } from "@/components/layouts/header/Header";
import { FC, memo, ReactNode } from "react";

export const PageLayout: FC<{ children: ReactNode }> = memo(
  function PageLayout({ children }) {
    return (
      <div className="relative min-h-[100vh]">
        <Header></Header>
        <main className="p-4">{children}</main>
        <Footer></Footer>
      </div>
    );
  }
);
