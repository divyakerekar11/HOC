"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
const SideBarContent = dynamic(() => import("@/components/Sidebar/SideBarContent"), {
  ssr: false,
});

// import AppointmentContent from "@/components/Leads/appointment/AppointmentContent";
const AppointmentContent = dynamic(
  () => import("@/components/Leads/appointment/AppointmentContent"),
  { ssr: false }
);

const AppointmentPage = () => {
  const [toggleWidth, setToggleWidth] = useState<boolean>(false);
  return (
    <div className="col-span-6">
      <div>
        <SideBarContent setToggleWidth={setToggleWidth} />
      </div>
      <div
        // className={
        //   toggleWidth
        //     ? `sm:px-4 p-0 sm:ml-20 ml-0 transition-all duration-300`
        //     : `sm:px-4 p-0 sm:ml-64 ml-0 transition-all duration-300`
        // }
        className={
          toggleWidth
            ? `sm:px-4 p-0 sm:ml-20 ml-0 transition-all duration-300`
            : `sm:px-4 p-0 sm:ml-60 ml-0 transition-all duration-300`
        }
      >
        <div className=" dark:border-gray-700">
          <AppointmentContent />
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
