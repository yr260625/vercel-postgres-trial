import Link from "next/link";

type articleDetailProps = {
  uid: string;
  filename: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export const ArticleCard = ({ uid, filename, content }: articleDetailProps) => {
  return (
    <Link href={`/articles/${uid}`}>
      <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
        <div className="p-4 md:p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
            {filename}
          </h3>
          <p className="mt-3 text-gray-500">{content}</p>
        </div>
        <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700"></div>
      </div>
    </Link>
  );
};
