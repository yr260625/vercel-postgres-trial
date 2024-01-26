import { ArticleDetail } from "@/app/articles/components/ArticleDetail";

type Article = {
  uid: string;
  filename: string;
  content: string;
  created_at: string;
  updated_at: string;
};

const API_SERVER_URL = `${process.env.API_SERVER_URL}`;

export default async function Id({ params }: { params: { id: string } }) {
  const response = await fetch(`${API_SERVER_URL}/api/articles/${params.id}`);
  const article: Article = await response.json();

  return <ArticleDetail {...article}></ArticleDetail>;
}
