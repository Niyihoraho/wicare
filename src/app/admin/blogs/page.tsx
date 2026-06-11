import { getContentData } from "@/actions/content";
import AdminBlogs from "./AdminBlogs";

export default async function AdminBlogsPage() {
  const data = await getContentData();
  
  return <AdminBlogs initialBlogs={data.blogs} />;
}
