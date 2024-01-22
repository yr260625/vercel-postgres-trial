import { ArticleDetail } from "@/app/articles/components/ArticleDetail";

type Article = {
  uid: string;
  filename: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export default async function Id({ params }: { params: { id: string } }) {
  const response = await fetch(
    `http://localhost:3000/api/articles/${params.id}`
  );
  const article: Article = await response.json();

  return <ArticleDetail {...article}></ArticleDetail>;
}
