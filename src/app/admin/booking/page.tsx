import { getBookingData } from "@/actions/booking";
import AdminDashboard from "./AdminDashboard";

export default async function AdminBookingPage() {
  const data = await getBookingData();
  
  return <AdminDashboard initialData={data} />;
}
