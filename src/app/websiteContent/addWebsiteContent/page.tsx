"use client";

// import SideBarContent from "@/components/Sidebar/SideBarContent";
import dynamic from "next/dynamic";
const SideBarContent = dynamic(() => import("@/components/Sidebar/SideBarContent"), {
  ssr: false,
});
import AddWebsiteContentForm from "@/components/WebsiteContent/components/AddWebsiteContentForm";
import React, { useState } from "react";

const AddWebsiteContentFormPage: React.FC = () => {
  const [toggleWidth, setToggleWidth] = useState<boolean>(false);
  return (
    <div className="col-span-6">
      <div>
        <SideBarContent setToggleWidth={setToggleWidth} />
      </div>
      <div
        className={
          toggleWidth
            ? `sm:p-4 p-0 sm:ml-20 ml-0  transition-all duration-300 bg-[#e8f4f1] min-h-[95vh]`
            : ` sm:p-4 p-0 sm:ml-60 ml-0 transition-all duration-300 bg-[#e8f4f1] min-h-[95vh]`
        }
      >
        <div className=" dark:border-gray-700">
          <AddWebsiteContentForm />
        </div>
      </div>
    </div>
  );
};

export default AddWebsiteContentFormPage;
