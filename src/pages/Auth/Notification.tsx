/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination } from "antd";
import Topbar from "../../Components/Shared/Topbar";
import { useGetAllNotificationQuery } from "../../redux/features/auth/authApi";
import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import Loading from "../../ui/Loading";
import { formatDistanceToNow } from "date-fns"; // Import date formatting function

const Notification = () => {
  const { collapsed } = useAppSelector((state) => state.auth);
  const limit = 12;
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useGetAllNotificationQuery({
    page,
    limit,
  });

  const notifications = data?.data;

  const onPageChange = (page: number) => {
    setPage(page);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <Topbar collapsed={collapsed} />

      <div className="max-w-4xl p-6">
        <h1 className="text-2xl font-semibold mb-6">Notifications</h1>
        <div className="space-y-2">
          {notifications?.result?.map((notification: any, index: number) => (
            <div
              key={index}
              className={`px-4 py-3 rounded-md flex items-center space-x-4 ${
                notification.type === "success"
                  ? "bg-green-100 text-green-800"
                  : notification.type === "info"
                  ? "bg-blue-100 text-blue-800"
                  : notification.type === "warning"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {/* Icon */}
              <div
                className={`w-3 h-3 rounded-full mr-3 ${
                  notification.type === "success"
                    ? "bg-green-600"
                    : notification.type === "info"
                    ? "bg-blue-600"
                    : notification.type === "warning"
                    ? "bg-yellow-600"
                    : "bg-green-600"
                }`}
              ></div>

              {/* Notification Message */}
              <div className="flex-1">
                <span>{notification.message}</span>
              </div>

              {/* Creation Time */}
              <div className="text-sm text-gray-500">
                {notification.createdAt &&
                  formatDistanceToNow(new Date(notification.createdAt), {
                    addSuffix: true,
                  })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Pagination
            align="start"
            current={page}
            onChange={onPageChange}
            pageSize={limit}
            total={notifications?.meta?.total}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Notification;
