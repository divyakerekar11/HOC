"use client";

import ResetPassword from "@/components/Auth/ResetPassword";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const ResetPasswordpage = () => {
  const { token } = useParams();
  return (
    <>
      <ResetPassword resetToken={token} />
    </>
  );
};

export default ResetPasswordpage;
