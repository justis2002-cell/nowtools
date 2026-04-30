import ToolListView from "@/components/ToolListView";
import { getAllPosts } from "@/lib/blog";

export default async function Home() {
  const allPosts = getAllPosts();
  return <ToolListView allPosts={allPosts} />;
}

