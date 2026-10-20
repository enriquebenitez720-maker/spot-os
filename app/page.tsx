import { DashboardHome } from "@/components/spot/content/DashboardHome";
import { getWorkspaceTree } from "@/lib/spot/workspace";

export default async function SpotHomePage() {
  const tree = await getWorkspaceTree();
  return <DashboardHome tree={tree} />;
}
