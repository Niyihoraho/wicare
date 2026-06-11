import { getContentData } from "@/actions/content";
import AdminVideos from "./AdminVideos";

export default async function AdminVideosPage() {
  const data = await getContentData();
  
  return <AdminVideos initialVideos={data.videos} />;
}
