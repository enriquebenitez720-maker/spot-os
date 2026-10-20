import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SpaceView } from "@/components/spot/content/SpaceView";
import { getSelection } from "@/lib/spot/workspace";

type Props = PageProps<"/espacios/[spaceId]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { spaceId } = await params;
  const resolved = await getSelection({ kind: "space", id: spaceId });
  return { title: resolved?.space.name ?? "Espacio" };
}

export default async function SpacePage({ params }: Props) {
  const { spaceId } = await params;
  const resolved = await getSelection({ kind: "space", id: spaceId });
  if (!resolved) notFound();
  return <SpaceView space={resolved.space} />;
}
