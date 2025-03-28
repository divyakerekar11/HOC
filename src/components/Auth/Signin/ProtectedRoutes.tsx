import { getUserToken } from "@/common/commonFunctions";
import SideBarContent from "@/components/Sidebar/SideBarContent";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProtectedRoutes = ({ children }: any) => {
  const router = useRouter();
  const [toggleWidth, setToggleWidth] = useState<boolean>(false);
  const token = getUserToken();
  useEffect(() => {
    // Get user token
    if (!token) {
      redirect("/auth/login");
    }
  }, [token]);
  return <>{children}</>;
};

export default ProtectedRoutes;
