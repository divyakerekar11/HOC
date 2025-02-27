import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import User from "../../asset/images/user.png";
import { timeAgo } from "@/common/commonFunctions";
import { NotificationUserUIconSVG } from "@/utils/SVGs/SVGs";
import { useNotificationStore } from "@/Store/NotificationStore";

const UserPic = User.src;

const InboxContent: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  const router = useRouter();

  const [notificationTriggered, setNotificationTriggered] = useState(false);

  const {
    fetchNotificationData,
    notificationData,
    fetchSingleNotificationData,
    notificationSingleData,
    fetchSingleReadNotificationData,
    notificationReadData,
  } = useNotificationStore();

  useEffect(() => {
    fetchNotificationData();
  }, []);

  const singleNotificationfecthHandler = async (notificationId: string) => {
    await fetchSingleNotificationData(notificationId);
    await fetchSingleReadNotificationData(notificationId);
    setNotificationTriggered(true);
  };

  useEffect(() => {
    if (notificationTriggered) {
      if (
        notificationSingleData &&
        Object.keys(notificationSingleData).length > 0
      ) {
        const itemType = notificationSingleData?.itemType;

        const queryData = { id: notificationSingleData?.item };
        const queryString = new URLSearchParams(queryData).toString();
        const idValue = queryString.split("=")[1];

        if (itemType === "Lead") {
          router.push(`/leads`);
        } else if (itemType === "CopywriterTracker") {
          router.push(`/copywriter`);
        } else if (itemType === "ProductFlow") {
          router.push(`/productFlow`);
        }
      }

      setNotificationTriggered(false);
    }
  }, [notificationTriggered, notificationSingleData]);

  useEffect(() => {
    fetchNotificationData();
  }, [notificationReadData]);

  return (
    <div className="px-4 py-0 relative">
<Table className="shadow-md rounded-lg border border-gray-300 ">
  <TableHeader>
    <TableRow className="bg-gray-100">
      <TableHead className="text-sm font-semibold text-white py-3">Assigned By</TableHead>
      <TableHead className="text-sm font-semibold text-white py-3">Message</TableHead>
      <TableHead className="text-sm font-semibold text-white py-3 text-right">Time</TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    {notificationData?.notifications?.length > 0 ? (
      notificationData.notifications.map((notification) => (
        <TableRow
          key={notification._id}
          onClick={() => singleNotificationfecthHandler(notification?._id)}
          className={`${
            notification?.isRead
              ? "bg-white text-gray-700 hover:bg-gray-50"
              : "bg-blue-50 text-blue-800 hover:bg-blue-100"
          } transition-all duration-300 ease-in-out cursor-pointer`}
        >
          {/* Avatar and Assigned To */}
          <TableCell className="font-semibold text-sm text-gray-800 py-4">
            <div className="flex items-center space-x-2">
              <Avatar className="cursor-pointer rounded-full shadow-md w-8 h-8">
                <AvatarImage src={notification?.assignedBy?.avatar || UserPic} />
                <AvatarFallback>
                  <img src={UserPic} alt="User Avatar" className="w-full h-full object-cover" />
                </AvatarFallback>
              </Avatar>
              {notification?.assignedTo?.fullName && (
                <span className="text-md font-medium text-black">
                  {notification?.assignedTo?.fullName}
                </span>
              )}
            </div>
          </TableCell>

          {/* Title and Message */}
          <TableCell className="text-left text-sm text-black py-4">
            <div className="font-semibold">
              {notification?.mentionedUsers && (
                <span className="text-[#1f76c2] text-xs">
                  {notification.mentionedUsers
                    .map((mention: any) => `@${mention?.fullName}`)
                    .join(", ")}
                </span>
              )}
              {notification.title}
            </div>
            <div className="text-xs text-gray-600">{notification.message}</div>
          </TableCell>

          {/* Time */}
          <TableCell className="text-right text-sm text-muted-foreground py-4">
            <span className="text-[0.8rem]">{timeAgo(notification.createdAt)}</span>
            {!notification.isRead && (
              <span className="flex h-2 w-2 bg-sky-500 rounded-full mt-1" />
            )}
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell
          colSpan={5}
          className="text-center font-semibold text-lg text-gray-500 py-4"
        >
          No Notifications Found
        </TableCell>
      </TableRow>
    )}
  </TableBody>

  <TableFooter>
    {/* Optional Footer Row */}
    {/* <TableRow>
      <TableCell colSpan={4}>Total Notifications</TableCell>
      <TableCell className="text-right">{notificationData?.notifications?.length || 0}</TableCell>
    </TableRow> */}
  </TableFooter>
</Table>
</div>

  );
};

export default InboxContent;
