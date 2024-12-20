"use client";

import BreadcrumbSection from "@/components/common/BreadcrumbSection";
import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
// import { columns2 } from "./columns2";
import { DataTable } from "@/components/common/data-table";
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  baseInstance,
  errorToastingFunction,
  formatDateYYYYMMDD,
  headerOptions,
} from "@/common/commonFunctions";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { LoaderIconSVG } from "@/utils/SVGs/SVGs";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import EventComponentBox from "./EventComponentBox";
// import { AddAppointmentDialoge } from "./AddAppointmentDialoge";
import User from "../../../asset/images/user.png";
import Link from "next/link";

const UserPic = User.src;

const customerData = [
  {
    id: 1,
    order_date: "2024-04-12",
    order_value: 400,
    order_status: "Pending",
  },
  {
    id: 2,
    order_date: "2024-04-13",
    order_value: 150,
    order_status: "Completed",
  },
  {
    id: 3,
    order_date: "2024-04-14",
    order_value: 350,
    order_status: "Completed",
  },
  {
    id: 4,
    order_date: "2024-04-15",
    order_value: 450,
    order_status: "Pending",
  },
  {
    id: 5,
    order_date: "2024-04-15",
    order_value: 450,
    order_status: "Pending",
  },
];

const crumbs = [
  {
    id: 1,
    title: "Home",
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Users",
    link: "/users",
  },
  {
    id: 3,
    title: "User Details",
    link: "",
  },
];

interface EmployeeLeaveDetailType {
  approvedBy: {
    avatar: string;
    email: string;
    fullName: string;
  };
  employeeId: {
    avatar: string;
    email: string;
    fullName: string;
  };
  endDate: string;
  startDate: string;
  returnDate: string;
  leaveType: string;
  leaveReason: string;
  managerComments: string;
  managerResponse: string;
  totalDayHoliday: string;
  totalWorkingDays: string;
  warning: string;
}

const EmployeeLeaveDetailsContent = () => {
  const { employeeLeaveId } = useParams();
  console.log("employeeLeaveId", employeeLeaveId);

  const router = useRouter();
  const [rowSelection, setRowSelection] = React.useState({});

  const [employeeLeaveDetails, setEmployeeLeaveDetails] =
    React.useState<EmployeeLeaveDetailType | null>(null);

  const getEmployeeLeaveDetails = async () => {
    try {
      const result = await baseInstance.get(`/leaves/${employeeLeaveId}`);
      if (result.status === 200) {
        setEmployeeLeaveDetails(result?.data?.data);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        errorToastingFunction(error?.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    getEmployeeLeaveDetails();
  }, []);

  console.log("employeeLeaveDetails", employeeLeaveDetails);

  return (
    <div className="px-4 py-0 relative">
      <div className="text-[1rem] font-semibold absolute top-[-60px]">
        {employeeLeaveDetails?.employeeId?.fullName || "Loading..."}
      </div>
      {/* <div className="mb-4">
        <BreadcrumbSection crumbs={crumbs} />
      </div> */}
      <div className="flex gap-5 mt-2">
        {/* <div className="my-3 text-[0.8rem] bg-[#fff] hover:bg-gray-300 h-fit px-2 py-1 rounded cursor-pointer hidden text-center sm:block w-fit boxShadow ">
          <Link href={`/employeeLeaveManagement`}>Back</Link>
        </div> */}
        <div className="boxShadow">
          <Card className="w-[575px] h-[100%]">
            <CardHeader>
              <CardTitle>Employee Leave Details</CardTitle>
              <CardDescription>Details Of existing Employee</CardDescription>
            </CardHeader>
            <CardContent>
              {/* avatar  */}
              <div className="flex justify-center mb-6">
                <Avatar className="h-[7rem] w-[7rem]">
                  <AvatarImage
                    src={employeeLeaveDetails?.employeeId?.avatar}
                    alt="@shadcn"
                  />
                  <AvatarFallback>
                    <img src={UserPic} className="" />
                  </AvatarFallback>
                </Avatar>
              </div>
              {/*  Employee Names */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="name" className="text-right font-bold">
                  Employee Name :
                </Label>
                <p className="mx-2">
                  {employeeLeaveDetails?.employeeId?.fullName || "Loading..."}
                </p>
              </div>
              {/* Email */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="name" className="text-right font-bold">
                  Email :
                </Label>
                <p className="mx-2">
                  {employeeLeaveDetails?.employeeId?.email || "Loading..."}
                </p>
              </div>
              {/* startDate  */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="username" className="text-right font-bold">
                  Start Date :
                </Label>
                <p className="mx-2">
                  {employeeLeaveDetails?.startDate
                    ? formatDateYYYYMMDD(employeeLeaveDetails?.startDate)
                    : "N/A" || "Loading..."}
                </p>
              </div>
              {/* End Date */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="username" className="text-right font-bold">
                  End Date :
                </Label>
                <p className="mx-2">
                  {employeeLeaveDetails?.endDate
                    ? formatDateYYYYMMDD(employeeLeaveDetails?.endDate)
                    : "N/A" || "Loading..."}
                </p>
              </div>
              {/*return Date  */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="username" className="text-right font-bold">
                  Return Date :
                </Label>
                <p className="mx-2">
                  {employeeLeaveDetails?.returnDate
                    ? formatDateYYYYMMDD(employeeLeaveDetails?.returnDate)
                    : "N/A" || "Loading..."}
                </p>
              </div>
              {/*totalDayHoliday  */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="username" className="text-right font-bold">
                  Total Day Holiday :
                </Label>
                <p className="mx-2">
                  {employeeLeaveDetails?.totalDayHoliday || "Loading..."}
                </p>
              </div>
              {/* totalWorkingDays  */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="username" className="text-right font-bold">
                  Total Working Days :
                </Label>
                <p className="mx-2">
                  {employeeLeaveDetails?.totalWorkingDays || "Loading..."}
                </p>
              </div>
              {/*leaveType*/}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="username" className="text-right font-bold">
                  Leave Type :
                </Label>
                <p className="mx-2">
                  {employeeLeaveDetails?.leaveType || "Loading..."}
                </p>
              </div>
              {/*leaveReason*/}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="username" className="text-right font-bold">
                  Leave Reason :
                </Label>
                <p className="mx-2">
                  {employeeLeaveDetails?.leaveReason || "Loading..."}
                </p>
              </div>
              {/*managerResponse*/}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="username" className="text-right font-bold">
                  Manager Response :
                </Label>
                <p className="mx-2">
                  {employeeLeaveDetails?.managerResponse || "Loading..."}
                </p>
              </div>
              {/*managerComments*/}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="username" className="text-right font-bold">
                  Manager Comments :
                </Label>
                <p className="mx-2">
                  {employeeLeaveDetails?.managerComments || "Loading..."}
                </p>
              </div>

              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <div className="flex items-center gap-3">
                  <Label className="text-right font-bold">Approved By : </Label>
                  <span>{employeeLeaveDetails?.approvedBy?.fullName} </span>
                  <span>
                    <Avatar className="h-[1.2rem] w-[1.2rem]">
                      <AvatarImage
                        src={employeeLeaveDetails?.approvedBy?.avatar}
                        alt="@shadcn"
                      />
                      <AvatarFallback>
                        <img src={UserPic} className="" />
                      </AvatarFallback>
                    </Avatar>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeaveDetailsContent;
