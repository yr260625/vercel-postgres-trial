type articleDetailProps = {
  uid: string;
  filename: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export const ArticleDetail = (props: articleDetailProps) => {
  return (
    <div className="p-4 md:p-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
        {props.uid}
      </h3>
      <p className="mt-3 text-gray-500">{props.filename}</p>
      <p className="mt-3 text-gray-500">{props.content}</p>
      <p className="mt-3 text-gray-500">{props.created_at}</p>
      <p className="mt-3 text-gray-500">{props.updated_at}</p>
    </div>
  );
};
