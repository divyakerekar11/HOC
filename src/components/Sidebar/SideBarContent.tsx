"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  AmendmentIconSVG,
  FilesIconSVG,
  GroupOfUsersIconSVG,
  HandshakeIconSVG,
  TechnicalIconSVG,
  HomeIconSVG,
  ReportIconSVG,
  SidebarToggler,
  CopywriterLogoSVG,
  ProductFlowLogoSVG,
  NewWebsiteContentLogoSVG,
  EmployeeLeaveLogoSVG,
  SalesIconSVG,
  NotificationBellIconSVG,
} from "@/utils/SVGs/SVGs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { NotificationBellIconSVG } from "@/utils/SVGs/SVGs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Appbar from "../Appbar/Appbar";
import Link from "next/link";
import Logo from "../../asset/images/logo.png";
import MiniLogo from "../../asset/images/mini-logo.png";
import "../../styles/common.css";
import MenuItem from "./components/MenuItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NotificationCard from "../Appbar/components/NotificationCard";
import { useNotificationStore } from "@/Store/NotificationStore";
import { useRouter, useSearchParams } from "next/navigation";
interface MenuItemIF {
  id: string;
  title: string;
  link: string;
  icon: JSX.Element;
  subMenues: SubMenuItem[];
}
interface SubMenuItem {
  id: number;
  subtitle: string;
}

const SideBarContent: React.FC<{ setToggleWidth: any }> = ({
  setToggleWidth,
}) => {

  const searchParams = useSearchParams();
  const queryParams = searchParams.get("id")
   const initialPage = Number(searchParams.get("page")) || 1;
    const initialLimit = Number(searchParams.get("limit")) || 20;
    const [page, setPage] = useState(initialPage);
    const [limit, setLimit] = useState(initialLimit);
  const [toggleSider, setToggleSider] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [openSmallSideBar, setOpenSmallSideBar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const logoSrc = Logo.src;
  const MiniLogoSrc = MiniLogo.src;
console.log("toggleSider",toggleSider)
  const togglerFunction = () => {
    setToggleSider((prev) => !prev);
    setToggleWidth((prev: any) => !prev);
    console.log("111",toggleSider)
    
  };

  let userDetails: any =
    typeof window !== "undefined" ? localStorage?.getItem("user") : null;
  let userRole = JSON.parse(userDetails)?.role;

  const showSmallSideBar = () => {
    setOpenSmallSideBar((prev) => !prev);
  };

  useEffect(() => {
    const savedScroll = localStorage.getItem("sidebarScroll");
    if (sidebarRef.current && savedScroll) {
      sidebarRef.current.scrollTop = parseInt(savedScroll, 10);
    }
  }, []);

  const handleScroll = () => {
    if (sidebarRef.current) {
      localStorage.setItem(
        "sidebarScroll",
        sidebarRef.current.scrollTop.toString()
      );
    }
  };
  const {
    fetchNotificationData,
    notificationData,
    fetchSingleNotificationData,
    notificationSingleData,
    fetchSingleReadNotificationData,
    notificationReadData,
  } = useNotificationStore();
  const [notificationTriggered, setNotificationTriggered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (notificationTriggered) {
      // Only run when triggered
      if (
        notificationSingleData &&
        Object.keys(notificationSingleData).length > 0
      ) {
        const itemType = notificationSingleData?.itemType;

        console.log("itemType", itemType);

        const queryData = {
          id: notificationSingleData?.item,
        };

        const queryString = new URLSearchParams(queryData).toString();
        const idValue = queryString.split("=")[1];
        if (itemType === "Amendment") {
          router.push(`/amendment`);
        } else if (itemType === "Customer") {
          router.push(`/customers`);
        } else if (itemType === "Order") {
          router.push(`/orders`);
        } else if (itemType === "Lead") {
          router.push(`/leads`);
        } else if (itemType === "NewWebsiteContent") {
          router.push(`/websiteContent`);
        } else if (itemType === "CopywriterTracker") {
          router.push(`/copywriter`);
        } else if (itemType === "TechnicalTracker") {
          router.push(`/technical`);
        } else if (itemType === "ProductFlow") {
          router.push(`/productFlow`);
        }

        // if (itemType === "Amendment") {
        //   router.push("/amendment");
        // } else if (itemType === "Customer") {
        //   router.push("/customers");
        // } else if (itemType === "Order") {
        //   router.push("/orders");
        // } else if (itemType === "Lead") {
        //   router.push("/leads");
        // } else if (itemType === "NewWebsiteContent") {
        //   router.push("/websiteContent");
        // }
      }

      setNotificationTriggered(false); // Reset the trigger state
    }
  }, [notificationTriggered, notificationSingleData]); // Include notificationSingleData if needed

  // useEffect(() => {
  //   fetchNotificationData();
  // }, [notificationReadData]);
  // useEffect(() => {
  //   fetchNotificationData();
  // }, []);



    // Fetch notifications based on page and limit
    const fetchNotifications = async () => {
      await fetchNotificationData({ page, limit });
    };
  
    // // Optionally, you can trigger the fetch when the form is opened or on any specific action
    useEffect(() => {
      fetchNotifications();
    }, [page, limit, fetchNotificationData,notificationReadData])
  return (
    <>
      {/* Mobile toggle button */}
      <div>
        <button
          data-drawer-target="sidebar-multi-level-sidebar"
          data-drawer-toggle="sidebar-multi-level-sidebar"
          aria-controls="sidebar-multi-level-sidebar"
          type="button"
          onClick={showSmallSideBar}
          onBlur={showSmallSideBar}
          className="inline-flex items-center p-2 mt-2 ms-3 text-[0.8rem] text-gray-500 sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 text-[0.9rem] ${
          toggleSider
            // ? "w-[17rem] closedSidebar"
                  ? "w-[16rem] closedSidebar"
            : `w-[6rem] OpenedSidebar ${
                openSmallSideBar ? "" : "-translate-x-full"
              }`
        } h-screen transition-transform sm:translate-x-0`}
        style={{ transition: "all 300ms" }}
        aria-label="Sidebar"
      >
        <div
          ref={sidebarRef}
          onScroll={handleScroll}
          className={`h-full ${
            toggleSider ? "px-3" : ""
          } pb-4 overflow-y-auto bg-[#013642] dark:bg-gray-800 text-[#fffff5]`}
        >
          {/* Logo Section */}
          <div
            className={`logo_wrapper flex items-center h-12 border-b border-gray-500 ${
              toggleSider ? "mt-[0.6rem] pb-3" : "px-2"
            }`}
          >
            <div className="cursor-pointer">
              <Link href="/dashboard">
                <img src={toggleSider ? logoSrc : MiniLogoSrc} alt="Logo" />
              </Link>
            </div>
            <div
              className={`${
                toggleSider ? "ml-[2.2rem] p-2" : "ml-2 p-1"
              } cursor-pointer bg-[#4b9437] hover:bg-gray-400`}
              onClick={() => togglerFunction()}
            >
              <SidebarToggler />
            </div>
          </div>

          {/* Menu Section */}
          <ul
            className={`${
              toggleSider ? "" : "space-y-2"
            } font-medium mt-[1rem] mainSidebar`}
          >
            <MenuItem
              label="Inbox"
              href="/inbox"
              isSidebarOpen={toggleSider}
              icon={
                <div className="relative cursor-pointer">
                  <NotificationBellIconSVG cssClass={"sidebar-icon-svg"} />
                  <div className="absolute top-0 left-3 h-4 w-4 rounded-full bg-red-600 flex justify-center items-center">
                    <span className="font-bold text-white text-[10px] ">
                      {notificationData?.notifications?.filter(
                        (notification: any) => !notification.isRead
                      ).length || 0}
                    </span>
                  </div>
                </div>
              }
            />

            <MenuItem
              label="Dashboard"
              href="/dashboard"
              isSidebarOpen={toggleSider}
              icon={<HomeIconSVG cssClass={"sidebar-icon-svg"} />}
              open={open}
              setOpen={setOpen}
            />
            {userRole !== "admin" ? null : (
              <MenuItem
                label="Users"
                href="/users"
                isSidebarOpen={toggleSider}
                icon={<HandshakeIconSVG cssClass={"sidebar-icon-svg"} />}
                open={open}
                setOpen={setOpen}
              />
            )}
            <MenuItem
              label="Customers"
              href="/customers"
              isSidebarOpen={toggleSider}
              icon={<GroupOfUsersIconSVG cssClass={"sidebar-icon-svg"} />}
              open={open}
              setOpen={setOpen}
            />
            <MenuItem
              label="Leads"
              href="/leads"
              isSidebarOpen={toggleSider}
              icon={<FilesIconSVG cssClass={"sidebar-icon-svg"} />}
              open={open}
              setOpen={setOpen}
            />
            <MenuItem
              label="Orders"
              href="/orders"
              isSidebarOpen={toggleSider}
              icon={<ReportIconSVG cssClass={"sidebar-icon-svg"} />}
              open={open}
              setOpen={setOpen}
            />
            <MenuItem
              label="Sales"
              href="/sales"
              isSidebarOpen={toggleSider}
              icon={<SalesIconSVG cssClass={"sidebar-icon-svg"} />}
              open={open}
              setOpen={setOpen}
            />
            <MenuItem
              label="Amendment"
              href="/amendment"
              isSidebarOpen={toggleSider}
              icon={<AmendmentIconSVG cssClass={"sidebar-icon-svg"} />}
              open={open}
              setOpen={setOpen}
            />
            <MenuItem
              label="Technical Tracker"
              href="/technical"
              isSidebarOpen={toggleSider}
              icon={<TechnicalIconSVG cssClass={"sidebar-icon-svg"} />}
              open={open}
              setOpen={setOpen}
            />
            <MenuItem
              label="Product Flow"
              href="/productFlow"
              isSidebarOpen={toggleSider}
              icon={<ProductFlowLogoSVG cssClass={"sidebar-icon-svg"} />}
              open={open}
              setOpen={setOpen}
            />
            <MenuItem
              label="Copywriter Tracker"
              href="/copywriter"
              isSidebarOpen={toggleSider}
              icon={<CopywriterLogoSVG cssClass={"sidebar-icon-svg"} />}
              open={open}
              setOpen={setOpen}
            />
            <MenuItem
              label="New Website Content"
              href="/websiteContent"
              isSidebarOpen={toggleSider}
              icon={<NewWebsiteContentLogoSVG cssClass={"sidebar-icon-svg"} />}
              open={open}
              setOpen={setOpen}
            />
            <MenuItem
              label="Employee Leave"
              href="/employeeLeaveManagement"
              isSidebarOpen={toggleSider}
              icon={<EmployeeLeaveLogoSVG cssClass={"sidebar-icon-svg"} />}
              open={open}
              setOpen={setOpen}
            />
          </ul>
        </div>
      </aside>

      <Appbar toggleSider={toggleSider} titleData={""} />
    </>
  );
};

export default SideBarContent;
