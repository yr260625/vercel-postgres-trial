export default function Id({ params }: { params: { id: string } }) {
  return <div>Blog_{params.id}</div>;
}

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}
