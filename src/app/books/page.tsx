import { ArticleCard } from "@/app/articles/components/ArticleCard";

type Article = {
  uid: string;
  filename: string;
  content: string;
};

export default async function Books() {
  // 記事一覧取得
  const response = await fetch("http://localhost:3000/api/articles");
  const articles: Article[] = await response.json();
  return (
    <main className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article: Article, idx: number) => {
          return (
            <ArticleCard
              key={idx}
              title={article.filename}
              content={article.content}
            ></ArticleCard>
          );
        })}
      </div>
    </main>
  );
}
