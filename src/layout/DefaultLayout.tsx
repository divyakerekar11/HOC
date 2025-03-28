"use client";

import SideBarContent from "@/components/Sidebar/SideBarContent";
import React, { useState } from "react";

const DefaultLayout = ({ childrens }: any) => {
  const [toggleWidth, setToggleWidth] = useState<boolean>(false);
  return (
    <div>
      <SideBarContent setToggleWidth={setToggleWidth} />
      {childrens}
    </div>
  );
};

export default DefaultLayout;
