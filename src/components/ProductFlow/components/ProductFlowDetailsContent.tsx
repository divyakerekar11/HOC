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
  formatDate,
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

const UserPic = User.src;

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

interface ProductFlowDetailType {
  currentStage: string;
  customer: {
    companyName: string;
    contactName: string;
  };
  date: string;
  datePhase1Instructed: string;
  datePhase2Instructed: string;
  demoCompletedDate: string;
  demoLink: string;
  liveDate: string;
  notes: string;
}

const ProductFlowDetailsContent = () => {
  const { productFlowId } = useParams();
  const router = useRouter();
  const [rowSelection, setRowSelection] = React.useState({});

  const [productDetails, setProductDetails] =
    React.useState<ProductFlowDetailType | null>(null);

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filtering, setFiltering] = React.useState("");

  const [date, setDate] = useState<Date | undefined>(new Date("2024-04-08"));
  const [showEventBox, setShowEventBox] = useState(false);

  const openEventModelFunction = () => {
    setShowEventBox(true);
  };

  const openDropDown = () => {
    setOpen(true);
  };

  const [open, setOpen] = useState<boolean>(false);

  const getProductDetails = async () => {
    try {
      const result = await baseInstance.get(`/productflows/${productFlowId}`);
      if (result.status === 200) {
        setProductDetails(result?.data?.data?.productFlow);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        errorToastingFunction(error?.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <div className="px-4 py-0 relative">
      <div className="text-[1rem] font-semibold absolute top-[-40px]">
        {productDetails?.customer?.companyName
          ? productDetails?.customer?.companyName
          : "loading..."}
      </div>
      {/* <div className="mb-4">
        <BreadcrumbSection crumbs={crumbs} />
      </div> */}
      {/* Main Customer details section  */}
      <div className="flex gap-5 mt-2">
        <div className="">
          <Card className="w-[575px] h-[100%] boxShadow">
            <CardHeader>
              <CardTitle className="text-[1rem]">Product Data</CardTitle>
              <CardDescription>Details Of existing product</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Contact Name  */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="name" className="text-right font-bold">
                  Company Name :
                </Label>
                <p className="mx-2">
                  {productDetails?.customer?.companyName || "Loading..."}
                </p>
              </div>
              {/* Company Name  */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="name" className="text-right font-bold">
                  Contact Name :
                </Label>
                <p className="mx-2">
                  {productDetails?.customer?.contactName || "Loading..."}
                </p>
              </div>
              {/* Current Stage  */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="name" className="text-right font-bold">
                  Current Stage :
                </Label>
                <p className="mx-2 bg-slate-100 px-1">
                  {productDetails?.currentStage || "Loading..."}
                </p>
              </div>
              {/* date  */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="username" className="text-right font-bold">
                  Date :
                </Label>
                <p className="mx-2">
                  {productDetails?.date
                    ? formatDate(productDetails?.date)
                    : "N/A" || "Loading..."}
                </p>
              </div>
              {/* datePhase1Instructed  */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="username" className="text-right font-bold">
                  Date Phase 1 Instructed :
                </Label>
                <p className="mx-2">
                  {productDetails?.datePhase1Instructed
                    ? formatDate(productDetails?.datePhase1Instructed)
                    : "N/A" || "Loading..."}
                </p>
              </div>
              {/* datePhase2Instructed */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="username" className="text-right font-bold">
                  Date Phase 2 Instructed :
                </Label>
                <p className="mx-2">
                  {productDetails?.datePhase2Instructed
                    ? formatDate(productDetails?.datePhase2Instructed)
                    : "N/A" || "Loading..."}
                </p>
              </div>
              {/* demoCompletedDate */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="username" className="text-right font-bold">
                  Demo Completed Date :
                </Label>
                <p className="mx-2">
                  {productDetails?.demoCompletedDate
                    ? formatDate(productDetails?.demoCompletedDate)
                    : "N/A" || "Loading..."}
                </p>
              </div>
              {/* liveDate */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="username" className="text-right font-bold">
                  Live Date :
                </Label>
                <p className="mx-2">
                  {productDetails?.liveDate
                    ? formatDate(productDetails?.liveDate)
                    : "N/A" || "Loading..."}
                </p>
              </div>
              {/* demoLink */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="username" className="text-right font-bold">
                  Demo Link :
                </Label>
                <p className="mx-2">
                  {productDetails?.demoLink
                    ? productDetails?.demoLink
                    : "N/A" || "Loading..."}
                </p>
              </div>
              {/* demoLink */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="username" className="text-right font-bold">
                  Notes :
                </Label>
                <p className="mx-2">
                  {productDetails?.notes
                    ? productDetails?.notes
                    : "N/A" || "Loading..."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductFlowDetailsContent;
