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
interface TechnicalTrackerDetailType {
  _id: string;
  customer: {
    companyName: string;
  };
  dateComplete: string;
  refNumber: string;
  status: string;
  technicalTask: string;
  timeTakenMinutes: string;
  priority: string;
}

const TechnicalTrackerDetailsContent = () => {
  const { technicalId } = useParams();

  const [technicalDetails, setTechnicalDetails] =
    React.useState<TechnicalTrackerDetailType | null>(null);

  const getTechnicalDetails = async () => {
    try {
      const result = await baseInstance.get(
        `/technicaltrackers/${technicalId}`
      );
      if (result.status === 200) {
        setTechnicalDetails(result?.data?.data?.tracker);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        errorToastingFunction(error?.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    getTechnicalDetails();
  }, []);

  return (
    <div className="px-4 py-0 relative">
      <div className="text-[1rem] font-semibold absolute top-[-40px]">
        {technicalDetails?.customer?.companyName
          ? technicalDetails?.customer?.companyName
          : "loading..."}
      </div>

      <div className="flex gap-5 mt-2">
        <div className="">
          <Card className="w-[575px] h-[100%] boxShadow">
            <CardHeader>
              <CardTitle className="text-[1rem]">Technical Data</CardTitle>
              <CardDescription>
                Details Of existing Technical Data
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Company Name  */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="name" className="text-right font-bold">
                  Customer Name :
                </Label>
                <p className="mx-2">
                  {technicalDetails?.customer?.companyName || "Loading..."}
                </p>
              </div>
              {/* Priority */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="name" className="text-right font-bold">
                  Priority :
                </Label>
                <p className="mx-2">
                  {technicalDetails?.priority || "Loading..."}
                </p>
              </div>
              {/* status  */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="username" className="text-right font-bold">
                  Status :
                </Label>
                <p className="mx-2 bg-slate-100 px-1">
                  {technicalDetails?.status || "Loading..."}
                </p>
              </div>
              {/* user Role  */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="username" className="text-right font-bold">
                  Technical Task :
                </Label>
                <p className="mx-2">
                  {technicalDetails?.technicalTask || "Loading..."}
                </p>
              </div>
              {/* Job Title  */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="username" className="text-right font-bold">
                  Time Taken Minutes :
                </Label>
                <p className="mx-2">
                  {technicalDetails?.timeTakenMinutes || "Loading..."}
                </p>
              </div>
              {/* Ref Number  */}
              <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                <Label htmlFor="username" className="text-right font-bold">
                  Ref Number :
                </Label>
                <p className="mx-2">
                  {technicalDetails?.refNumber || "Loading..."}
                </p>
              </div>
              {/* Ref Number  */}
              {technicalDetails?.dateComplete ? (
                <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b text-[0.8rem]">
                  <Label htmlFor="username" className="text-right font-bold">
                    Date Complete :
                  </Label>
                  <p className="mx-2">
                    {formatDate(technicalDetails?.dateComplete)}
                  </p>
                </div>
              ) : (
                ""
              )}
            </CardContent>
          </Card>
        </div>
        <div className="flex gap-4" onClick={(e) => e.stopPropagation()}></div>
      </div>
    </div>
  );
};

export default TechnicalTrackerDetailsContent;
