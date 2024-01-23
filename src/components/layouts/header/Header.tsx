"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  const urlList = [
    { href: "/articles", name: "一覧" },
    { href: "/articles/post", name: "投稿" },
  ];

  return (
    <header className="flex justify-between bg-blue-600 p-4">
      <h1 className="text-white text-xl">記事管理</h1>
      <div className="flex gap-4">
        {urlList.map(({ href, name }, idx) => {
          return (
            <Link href={href} key={idx}>
              <div className={pathname == href ? "text-white" : "text-gray-400"}>{name}</div>
            </Link>
          );
        })}
      </div>
    </header>
  );
};
