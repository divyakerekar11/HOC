"use client";
import EditCopywriter from "@/components/CopywriterTracker/components/EditCopywriter";
import EditProductFlow from "@/components/ProductFlow/components/EditProductFlow";
import SideBarContent from "@/components/Sidebar/SideBarContent";
import React, { useEffect, useState } from "react";

const EditCopywriterPage = () => {
  const [toggleWidth, setToggleWidth] = useState<boolean>(false);
  return (
    <div className="col-span-6">
      <div>
        <SideBarContent setToggleWidth={setToggleWidth} />
      </div>
      <div
        className={`${
          toggleWidth ? "sm:ml-20 ml-0" : "sm:ml-56 ml-0"
        } p-0 sm:p-4 transition-all duration-300 bg-[#e8f4f1] min-h-[95vh] `}
      >
        <div className="dark:border-gray-700">
          <EditCopywriter />
        </div>
      </div>
    </div>
  );
};

export default EditCopywriterPage;
