import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FolderView } from "@/components/spot/content/FolderView";
import { getSelection } from "@/lib/spot/workspace";

type Props = PageProps<"/carpetas/[folderId]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { folderId } = await params;
  const resolved = await getSelection({ kind: "folder", id: folderId });
  return { title: resolved?.folder?.name ?? "Carpeta" };
}

export default async function FolderPage({ params }: Props) {
  const { folderId } = await params;
  const resolved = await getSelection({ kind: "folder", id: folderId });
  if (!resolved?.folder) notFound();
  return <FolderView space={resolved.space} folder={resolved.folder} />;
}
