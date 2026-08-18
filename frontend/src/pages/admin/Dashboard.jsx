import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import api from "../../utils/serviceAPI";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalEnquiries: 0,
    adminUsers: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const [blogsRes, contactsRes] = await Promise.all([
          api.get("/api/blog"),
          api.get("/api/contact"),
        ]);

        setStats({
          totalBlogs: blogsRes.data.blogs?.length || 0,
          totalEnquiries: contactsRes.data.contacts?.length || 0,
          adminUsers: 1,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats({
          totalBlogs: 0,
          totalEnquiries: 0,
          adminUsers: 1,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout title="Dashboard">
      <div>
        <div>
          <div className="mb-8">
            <h1 className="h1 text-[#141C3A]">
              Welcome to Admin Dashboard
            </h1>
            <p className="mt-2 text-[15px] text-[#6D7487]">
              Here's an overview of your content and enquiries.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-[28px] p-8 border border-[#ECECEC] shadow-sm animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded w-20 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded w-16"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-[28px] p-8 border border-[#ECECEC] shadow-sm hover:shadow-md transition">
                <h3 className="text-[#6D7487] text-[15px] font-medium">
                  Total Blogs
                </h3>

                <h1 className="h1 mt-3 text-[#141C3A]">
                  {stats.totalBlogs}
                </h1>

                <p className="mt-2 text-[12px] text-[#9CA3AF]">
                  Published articles
                </p>
              </div>

              <div className="bg-white rounded-[28px] p-8 border border-[#ECECEC] shadow-sm hover:shadow-md transition">
                <h3 className="text-[#6D7487] text-[15px] font-medium">
                  Enquiries
                </h3>

                <h1 className="h1 mt-3 text-[#141C3A]">
                  {stats.totalEnquiries}
                </h1>

                <p className="mt-2 text-[12px] text-[#9CA3AF]">
                  Customer messages
                </p>
              </div>

              <div className="bg-white rounded-[28px] p-8 border border-[#ECECEC] shadow-sm hover:shadow-md transition">
                <h3 className="text-[#6D7487] text-[15px] font-medium">
                  Admin Users
                </h3>

                <h1 className="h1 mt-3 text-[#141C3A]">
                  {stats.adminUsers}
                </h1>

                <p className="mt-2 text-[12px] text-[#9CA3AF]">
                  Active administrators
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
