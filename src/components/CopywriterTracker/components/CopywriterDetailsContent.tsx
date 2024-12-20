"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  baseInstance,
  errorToastingFunction,
  formatDate,
  headerOptions,
} from "@/common/commonFunctions";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
interface CopywriterDetailType {
  status: string;
  dateComplete: string;
  customer: {
    companyName: string;
  };
}

const CopywriterDetailsContent = () => {
  const { copywriterId } = useParams();
  const [copywriterDetails, setCopywriterDetails] =
    React.useState<CopywriterDetailType | null>(null);

  const getCopywriterDetails = async () => {
    try {
      const result = await baseInstance.get(
        `/copywritertrackers/${copywriterId}`
      );
      if (result.status === 200) {
        setCopywriterDetails(result?.data?.data);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        errorToastingFunction(error?.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    getCopywriterDetails();
  }, []);

  return (
    <div className="px-4 py-0 relative">
      <div className="text-[1rem] font-semibold absolute top-[-40px]">
        {copywriterDetails?.customer?.companyName
          ? copywriterDetails?.customer?.companyName
          : "loading..."}
      </div>
      <div className="flex gap-5 mt-2">
        <div className="">
          <Card className="w-[575px] h-[100%]">
            <CardHeader>
              <CardTitle className="text-[1rem]">Copywriter Data</CardTitle>
              <CardDescription>Details Of existing Copywriter</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Current Stage  */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="name" className="text-right font-bold">
                  Status :
                </Label>
                <p className="mx-2 bg-slate-100 px-1">
                  {copywriterDetails?.status || "Loading..."}
                </p>
              </div>
              {/* date  */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="username" className="text-right font-bold">
                  Date :
                </Label>
                <p className="mx-2">
                  {copywriterDetails?.dateComplete
                    ? formatDate(copywriterDetails?.dateComplete)
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

export default CopywriterDetailsContent;
