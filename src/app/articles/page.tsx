import { ArticleCard } from "@/app/articles/components/ArticleCard";
import Link from "next/link";

type articleDetailProps = {
  uid: string;
  filename: string;
  content: string;
  created_at: string;
  updated_at: string;
};

const API_SERVER_URL = `${process.env.API_SERVER_URL}`;

export default async function Articles() {
  // 記事一覧取得
  const response = await fetch(`${API_SERVER_URL}/api/articles`);
  const articles: articleDetailProps[] = await response.json();
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article: articleDetailProps, idx: number) => {
        return <ArticleCard {...article} key={idx}></ArticleCard>;
      })}
    </div>
  );
}
