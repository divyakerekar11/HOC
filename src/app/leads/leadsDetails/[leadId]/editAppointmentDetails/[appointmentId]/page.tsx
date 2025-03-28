"use client";

import {
  baseInstance,
  headerOptions,
  logOutFunction,
} from "@/common/commonFunctions";
import EditAppointmentForm from "@/components/Leads/components/EditAppointmentForm";
import LeadsDetailsContent from "@/components/Leads/components/LeadsDetailsContent";
import SideBarContent from "@/components/Sidebar/SideBarContent";
import React, { useEffect, useState } from "react";

const EditAppointmentPage = () => {
  const [toggleWidth, setToggleWidth] = useState<boolean>(false);
  return (
    <div className="col-span-6">
      <div>
        <SideBarContent setToggleWidth={setToggleWidth} />
      </div>
      <div
        // className={`${
        //   toggleWidth ? "sm:ml-20 ml-0" : "sm:ml-64 ml-0"
        // } p-0 sm:px-4 transition-all duration-300`}
        className={`${
          toggleWidth ? "sm:ml-20 ml-0" : "sm:ml-60 ml-0"
        } p-0 sm:px-4 transition-all duration-300 bg-[#e8f4f1] min-h-[95vh] `}
      >
        <div className=" dark:border-gray-700">
          {/* <LeadsDetailsContent /> */}
          <EditAppointmentForm />
        </div>
      </div>
    </div>
  );
};

export default EditAppointmentPage;
