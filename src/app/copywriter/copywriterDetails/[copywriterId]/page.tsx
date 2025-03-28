"use client";

import CopywriterDetailsContent from "@/components/CopywriterTracker/components/CopywriterDetailsContent";
import SideBarContent from "@/components/Sidebar/SideBarContent";
import UserDetailsContent from "@/components/Users/components/UserDetailsContent";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CopyWriterDetailsPage = () => {
  const [toggleWidth, setToggleWidth] = useState<boolean>(false);
  return (
    <div className="col-span-6">
      <div>
        <SideBarContent setToggleWidth={setToggleWidth} />
      </div>
      <div
        className={`${
          toggleWidth ? "sm:ml-20 ml-0" : "sm:ml-60 ml-0"
        } sm:px-4 p-0 transition-all duration-300 bg-[#e8f4f1] min-h-[95vh] `}
      >
        <div className="dark:border-gray-700">
          <CopywriterDetailsContent />
        </div>
      </div>
    </div>
  );
};

export default CopyWriterDetailsPage;
