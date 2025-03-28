import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import User from "../../asset/images/user.png";
import {
  baseInstance,
  errorToastingFunction,
  successToastingFunction,
  timeAgo,
} from "@/common/commonFunctions";
import { useNotificationStore } from "@/Store/NotificationStore";
import {
  Select as Selector,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddDialoge from "./AddDialoge";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
// import { columns } from "./components/columns";
// import { DataTable } from "../common/data-table";
import { DataTable } from "../common/data-table";
import { columns } from "./columns";
import SideDrawer from "../common/Editor/SideDrawer";
import DeleteDialoge from "../Orders/components/DeleteDialoge";
import InfiniteScroll from "react-infinite-scroll-component";
import { Cross1Icon } from "@radix-ui/react-icons";
import { TrashIcon } from "lucide-react";
const UserPic = User.src;

const InboxContent: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  const router = useRouter();
  const [hasMore, setHasMore] = useState(true);
  const [notificationTriggered, setNotificationTriggered] = useState(false);

  const {
    fetchNotificationData,
    notificationData,
    fetchSingleNotificationData,
    notificationSingleData,
    fetchSingleReadNotificationData,
    notificationReadData,
    loading,
  } = useNotificationStore();

  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    if (
      notificationData === "Invalid refresh token" ||
      notificationData === "User not found" ||
      notificationData === "Invalid User Access Token" ||
      notificationData === "Invalid access token" ||
      notificationData === "Unauthorized request: No access or refresh token"
    ) {
      router.push("/auth/login");
    } else {
      setLoader(false);
      setNotificationList(
        notificationData?.notifications
          ? notificationData.notifications || []
          : []
      );
    }
  }, [notificationData, router]);
  const searchParams = useSearchParams();
  const queryParams = searchParams.get("id");
  const pathname = usePathname();
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialLimit = Number(searchParams.get("limit")) || 20;
  const [page, setPage] = useState(1);
  const [limit2, setLimit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(1);
  const onPageChange = (newPage: number, newLimit: number) => {
    setPage(newPage);
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", newPage.toString());
    params.set("limit", newLimit.toString());

    router.push(`${pathname}?${params.toString()}`);
  };
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [notificationList, setNotificationList] = useState<any[]>([]);

  const data = useMemo(() => notificationList, [notificationList]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filtering, setFiltering] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [loadingMore, setLoadingMore] = useState(false);
  const limit = 20;

  const fetchNotifications = async (page: number) => {
    if (loadingMore) return;

    setLoadingMore(true);

    try {
      const response = await baseInstance.get(
        `/notifications?page=${page}&limit=${limit}`
      );
      const newData = response?.data?.data?.notifications || [];

      const hasMore = response?.data?.data?.hasMore || false;

      setHasMore(hasMore);
      const total = response?.data?.data?.totalPages;
      setTotalPages(total);
      console.log("total", total);

      setNotificationList((prevData) =>
        page === 1 ? newData : [...prevData, ...newData]
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchNotifications(page);
  }, [page]);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const handleDelete = async (notificationId: string) => {
    setIsDeleting(true);
    try {
      const response = await baseInstance.delete(
        `/notifications/${notificationId}`
      );
      if (response?.status === 200) {
        successToastingFunction(response?.data?.message);

        // Manually remove the notification from the list
        // setNotificationList(prevData => prevData.filter(notification => notification._id !== notificationId));

        // Optionally, re-fetch notifications if needed
        fetchNotifications(page);
      }
    } catch (error) {
      console.error("Error deleting notification", error);
      errorToastingFunction("Failed to delete notification");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRowClick = async (event: React.MouseEvent, notification: any) => {
    if (isDeleting) {
      setIsDeleting(false);
      return;
    }

    if (!notification.isRead) {
      await fetchSingleReadNotificationData(notification._id);
    }

    // fetchSingleNotificationData(notification._id);
    setNotificationTriggered(true);
    fetchNotifications(page);
  };

  return (
    <>
      <div className="md:flex justify-center sm:justify-end my-2 px-4 pt-[5px]">
        <AddDialoge />
      </div>

      <div className="px-4 py-0 relative">
        <InfiniteScroll
          dataLength={notificationList.length}
          next={() => {
            setPage(page + 1); // Increase page number and trigger a fetch for more data
            fetchNotifications(page + 1); // Fetch data for the next page
          }}
          hasMore={hasMore}
          loader={
            loadingMore ? (
              <div className="text-center py-2">Loading...</div>
            ) : null
          }
          scrollThreshold={0.9}
          scrollableTarget="scrollable-table-container"
          style={{ overflow: "visible" }}
        >
          <div
            className="overflow-y-auto relative"
            style={{ maxHeight: "750px" }}
            id="scrollable-table-container"
          >
            <Table className="shadow-md border-gray-300 ">
              <TableHeader className="">
                {/* fixed */}
                <TableRow className="bg-gray-100 ">
                  <TableHead className="text-sm font-semibold text-white py-3">
                    Assigned By
                  </TableHead>
                  <TableHead className="text-sm font-semibold text-white py-3">
                    Message
                  </TableHead>
                  <TableHead className="text-sm font-semibold text-white py-3 ">
                    Update
                  </TableHead>
                  <TableHead className="text-sm font-semibold text-white py-3">
                    Time
                  </TableHead>
                  <TableHead className="text-sm font-semibold text-white py-3 text-right">
                    Delete
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {notificationList.length > 0 ? (
                  notificationList.map((notification: any) => (
                    <TableRow
                      key={notification._id}
                      onClick={(event) => handleRowClick(event, notification)}
                      // onClick={() =>
                      //   singleNotificationfecthHandler(notification?._id)
                      // }
                      className={`${
                        notification?.isRead
                          ? "bg-white text-gray-700 hover:bg-gray-50"
                          : "bg-blue-50 text-blue-800 hover:bg-blue-100"
                      } transition-all duration-300 ease-in-out cursor-pointer`}
                    >
                      <TableCell className="font-semibold text-sm text-gray-800 py-4">
                        <div className="flex items-center space-x-2">
                          <Avatar className="cursor-pointer rounded-full shadow-md w-8 h-8">
                            <AvatarImage
                              src={notification?.assignedBy?.avatar || UserPic}
                            />
                            <AvatarFallback>
                              <img
                                src={UserPic}
                                alt="User Avatar"
                                className="w-full h-full object-cover"
                              />
                            </AvatarFallback>
                          </Avatar>
                          {notification?.assignedBy?.fullName && (
                            <span className="text-md font-medium text-black">
                              {notification?.assignedBy?.fullName}
                            </span>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="text-left text-sm text-black py-4">
                        <div className="font-semibold">
                          {/* {notification?.mentionedUsers && (
                        <span className="text-[#1f76c2] text-xs">
                          {notification.mentionedUsers
                            .map((mention: any) => `@${mention?.fullName}`)
                            .join(", ")}
                        </span>
                      )}{" "}
                      {""} */}
                          {notification.title}
                        </div>
                        <div className="text-xs text-gray-600">
                          {notification.message}
                        </div>
                      </TableCell>

                      <TableCell className="text-right text-sm text-muted-foreground py-4">
                        <span className="text-[0.8rem]">
                          <SideDrawer
                            length={notification?.updates?.length || 0}
                            {...{
                              amendmentId:
                                notification.itemType === "Amendment"
                                  ? notification.item?._id
                                  : undefined,
                              userId:
                                notification.itemType === "User"
                                  ? notification.item?._id
                                  : undefined,

                              technicalId:
                                notification.itemType === "TechnicalTracker"
                                  ? notification.item?._id
                                  : undefined,
                              orderId:
                                notification.itemType === "Order"
                                  ? notification.item?._id
                                  : undefined,
                              leadId:
                                notification.itemType === "Lead"
                                  ? notification.item?._id
                                  : undefined,
                              productFlowId:
                                notification.itemType === "ProductFlow"
                                  ? notification.item?._id
                                  : undefined,
                              websiteContentId:
                                notification.itemType === "NewWebsiteContent"
                                  ? notification.item?._id
                                  : undefined,
                              copywriterId:
                                notification.itemType === "CopywriterTracker"
                                  ? notification.item?._id
                                  : undefined,
                            }}
                          />
                        </span>
                      </TableCell>

                      <TableCell className="text-left text-sm text-muted-foreground py-4">
                        <span className="text-[0.8rem]">
                          {timeAgo(notification.createdAt)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground py-4">
                        {/* <DeleteDialoge
                          id={notification._id}
                          entity="notifications"
                          // setIsModalOpen={setIsModalOpen}
                          // setIsCommentOpen={setIsCommentOpen}
                          fetchAllFunction={() => fetchNotifications(1)}
                          onClick={async () => {
                            // Mark as read before deleting
                            await fetchSingleReadNotificationData(
                              notification._id
                            );
                            setNotificationList(prevData => prevData.filter(notification => notification._id !== notification._id ));
                            fetchNotifications(1);
                           
                          }}
                          />  */}
                        <span 
                          className="text-[0.8rem] flex justify-end"
                          id={notification._id}
                          onClick={async () => {
                    
                            await fetchSingleReadNotificationData(
                              notification._id
                            );
                            handleDelete(notification._id);
                          }}
                        >
                          <TrashIcon className="h-6 w-7 p-1 hover:bg-[#013642] text-black hover:text-[white] border-0 rounded-lg " />
                        </span>
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

              <TableFooter></TableFooter>
            </Table>
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default InboxContent;