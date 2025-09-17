/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination } from "antd";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import Topbar from "../../Components/Shared/Topbar";
import { useSocket } from "../../context/socket-context";
import useUserData from "../../hooks/useUserData";
import { useGetAllNotificationQuery } from "../../redux/features/auth/authApi";
import { useAppSelector } from "../../redux/hooks";
import Loading from "../../ui/Loading";

export interface INotification {
  _id: string;
  createdAt: string;
  updatedAt: string;
  isRead: boolean;
  linkId: string;
  message: string;
  receiverId: string;
  role:
    | "admin"
    | "supervisor"
    | "hr"
    | "hubManager"
    | "spokeManager"
    | "fieldOfficer";
  senderId: string;
  type:
    | "new_lead_added"
    | "new_application_added"
    | "loan_reminder"
    | "user_created"
    | "repayment"
    | string;
  __v: number;
}

interface NotificationOptions {
  body?: string;
  icon?: string;
  badge?: string;
  tag?: string;
  requireInteraction?: boolean;
  silent?: boolean;
  onClick?: () => void;
}

const Notification = () => {
  const { collapsed } = useAppSelector((state) => state.auth);
  const limit = 12;
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useGetAllNotificationQuery({
    page,
    limit,
  });

  const notifications = data?.data;
  const user = useUserData();
  const socket = useSocket()?.socket;

  const [allNotifications, setAllNotifications] = useState<INotification[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setPermission] = useState(
    typeof window !== "undefined" && "Notification" in window
      ? window.Notification.permission
      : "default"
  );

  // Request notification permission when component mounts
  useEffect(() => {
    const requestPermission = async () => {
      if (
        typeof window !== "undefined" &&
        "Notification" in window &&
        window.Notification.permission === "default"
      ) {
        try {
          const result = await window.Notification.requestPermission();
          setPermission(result);
        } catch (error) {
          console.error("Error requesting notification permission:", error);
        }
      }
    };
    requestPermission();
  }, []);

  // Function to show browser notification
  const showBrowserNotification = (
    title: string,
    options: NotificationOptions = {}
  ) => {
    if (
      typeof window === "undefined" ||
      !("Notification" in window) ||
      window.Notification.permission !== "granted"
    ) {
      console.warn("Notification permission not granted or not supported");
      return null;
    }

    try {
      const notification = new window.Notification(title, {
        body: options.body || "You have a new notification",
        icon: options.icon || "/favicon.ico",
        badge: options.badge || "/badge.png",
        tag: options.tag || "default",
        requireInteraction: options.requireInteraction || false,
        silent: options.silent || false,
        ...options,
      });

      // Handle notification click
      notification.onclick = () => {
        window.focus();
        notification.close();
        if (options.onClick) {
          options.onClick();
        }
      };

      // Auto close after 8 seconds
      setTimeout(() => {
        notification.close();
      }, 8000);

      return notification;
    } catch (error) {
      console.error("Error showing notification:", error);
      return null;
    }
  };

  // Socket notification handler for browser alerts
  const handleNotificationAlert = (data: any) => {
    console.log("Notification received:", data);

    // Show browser notification
    showBrowserNotification(data.title || "New Notification", {
      body: data.message || data.body || "You have a new notification",
      icon: data.icon || "/notification-icon.png",
      tag: data.id || "notification-" + Date.now(),
      requireInteraction: false,
      onClick: () => {
        console.log("Notification clicked");
        // You can add navigation logic here
        // For example: navigate to notification details page
        // window.location.href = `/notifications/${data.linkId}`;
      },
    });
  };

  // Set notifications from API
  useEffect(() => {
    setAllNotifications(notifications?.result || []);
  }, [notifications]);

  // Handle new notification from socket
  const handleNotification = (data: any) => {
    console.log("Socket notification data:", data);
    setAllNotifications((prev) => [data?.data, ...prev]);
  };

  // Socket connection and event listeners
  useEffect(() => {
    if (!socket?.connected) {
      socket?.connect();
    }

    const eventName = `notification::${user?._id}`;

    const handleSocketNotification = (data: any) => {
      // Show browser notification
      handleNotificationAlert({
        title:
          data?.data?.type === "new_lead_added"
            ? "New Lead Added"
            : data?.data?.type === "loan_reminder"
            ? "Loan Reminder"
            : data?.data?.type === "repayment"
            ? "Payment Reminder"
            : "New Notification",
        message: data?.data?.message || "You have a new notification",
        id: data?.data?._id,
        linkId: data?.data?.linkId,
      });

      // Update local state
      handleNotification(data);
    };

    socket?.on(eventName, handleSocketNotification);

    return () => {
      socket?.off(eventName, handleSocketNotification);
    };
  }, [socket, user?._id]);

  // Sort notifications by creation time
  const sortedNotifications = allNotifications
    ?.slice()
    .sort(
      (a: INotification, b: INotification) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const onPageChange = (page: number) => {
    setPage(page);
  };

  // Get notification type styling
  const getNotificationStyle = (notificationType: string) => {
    switch (notificationType) {
      case "new_lead_added":
        return {
          containerClass: "bg-blue-100 text-blue-800",
          dotClass: "bg-blue-600",
        };
      case "loan_reminder":
        return {
          containerClass: "bg-yellow-100 text-yellow-800",
          dotClass: "bg-yellow-600",
        };
      case "repayment":
        return {
          containerClass: "bg-green-100 text-green-800",
          dotClass: "bg-green-600",
        };
      case "user_created":
        return {
          containerClass: "bg-purple-100 text-purple-800",
          dotClass: "bg-purple-600",
        };
      default:
        return {
          containerClass: "bg-gray-100 text-gray-800",
          dotClass: "bg-gray-600",
        };
    }
  };

  console.log("allNotifications", allNotifications);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <Topbar collapsed={collapsed} />

      <div className="max-w-4xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Notifications</h1>
        </div>

        <div className="space-y-3">
          {sortedNotifications?.length > 0 ? (
            sortedNotifications.map(
              (notification: INotification, index: number) => {
                const style = getNotificationStyle(notification.type);

                return (
                  <div
                    key={notification._id || index}
                    className={`px-4 py-4 rounded-lg border flex items-start space-x-4 hover:shadow-md transition-all duration-200 ${
                      style.containerClass
                    } ${
                      !notification.isRead ? "border-l-4 border-l-blue-500" : ""
                    }`}
                  >
                    {/* Status Dot */}
                    <div
                      className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${style.dotClass}`}
                    ></div>

                    {/* Notification Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium mb-1 capitalize">
                            {notification.type.replace(/_/g, " ")}
                          </p>
                          <p className="text-sm">{notification.message}</p>
                        </div>

                        {/* Time and Status */}
                        <div className="flex flex-col items-end ml-4 flex-shrink-0">
                          <div className="text-xs text-gray-500 mb-1">
                            {notification.createdAt &&
                              formatDistanceToNow(
                                new Date(notification.createdAt),
                                {
                                  addSuffix: true,
                                }
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">
                No notifications yet
              </div>
              <div className="text-gray-400 text-sm">
                You'll see new notifications here
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {notifications?.meta?.total > limit && (
          <div className="mt-8 flex justify-center">
            <Pagination
              current={page}
              onChange={onPageChange}
              pageSize={limit}
              total={notifications?.meta?.total}
              showSizeChanger={false}
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} notifications`
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
