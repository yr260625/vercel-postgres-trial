"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();
  const urlList = [
    { href: "/image-uploader", name: "画像一覧" },
    { href: "/image-uploader/post", name: "画像投稿" },
  ];

  return (
    <aside className="sm:block w-48 h-full bg-white">
      <div className="flex flex-1 flex-col overflow-y-auto">
        {urlList.map(({ href, name }, idx) => {
          return (
            <Link href={href} key={idx} className="flex items-center justify-center h-12 border-b">
              <div className={pathname == href ? "text-gray-900" : "text-gray-400"}>{name}</div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};
