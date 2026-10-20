import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListView } from "@/components/spot/content/ListView";
import { getSelection } from "@/lib/spot/workspace";

type Props = PageProps<"/listas/[listId]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { listId } = await params;
  const resolved = await getSelection({ kind: "list", id: listId });
  return { title: resolved?.list?.name ?? "Lista" };
}

export default async function ListPage({ params }: Props) {
  const { listId } = await params;
  const resolved = await getSelection({ kind: "list", id: listId });
  if (!resolved?.folder || !resolved.list) notFound();
  return <ListView space={resolved.space} folder={resolved.folder} list={resolved.list} />;
}
