import { ArticleCard } from "@/app/articles/components/ArticleCard";
import Link from "next/link";

type articleDetailProps = {
  uid: string;
  filename: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export default async function Articles() {
  // 記事一覧取得
  const response = await fetch("http://localhost:3000/api/articles");
  const articles: articleDetailProps[] = await response.json();
  return (
    <main className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article: articleDetailProps, idx: number) => {
          return <ArticleCard {...article} key={idx}></ArticleCard>;
        })}
      </div>
    </main>
  );
}
