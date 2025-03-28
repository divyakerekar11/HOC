"use client";
import OrderDetail from "@/components/Orders/components/OrderDetail";
import SideBarContent from "@/components/Sidebar/SideBarContent";
import React, { useState } from "react";

const OrderDetailsPage: React.FC = () => {
  const [toggleWidth, setToggleWidth] = useState<boolean>(false);
  return (
    <div className="col-span-6">
      <div>
        <SideBarContent setToggleWidth={setToggleWidth} />
      </div>
      <div
        className={
          toggleWidth
            ? `sm:px-4 p-0 ml-0 sm:ml-20 transition-all duration-300 bg-[#e8f4f1] min-h-[95vh] `
            : `sm:px-4 p-0 ml-0 sm:ml-60 transition-all duration-300 bg-[#e8f4f1] min-h-[95vh] `
        }
      >
        <div className="dark:border-gray-700">
          <OrderDetail />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
