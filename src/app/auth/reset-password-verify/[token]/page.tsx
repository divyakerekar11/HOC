"use client";

import {
  baseInstance,
  errorToastingFunction,
  successToastingFunction,
} from "@/common/commonFunctions";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ResetPasswordVerifypage = () => {
  const { token } = useParams();
  const router = useRouter();

  // Verify Reset Password Link API
  const verifyResetPassword = async () => {
    try {
      const result = await baseInstance.get(
        `/users/reset-password-token/${token}`
      );
      if (result.status === 200) {
        successToastingFunction(result.data.message);
        router.push(`/auth/reset-password/${token}`);
      } else {
        errorToastingFunction("Something went wrong, Please try again later!");
        router.push("/auth/forgetPassword");
      }
    } catch (error: any) {
      if (
        error?.response &&
        error?.response?.data &&
        error?.response?.data?.message
      ) {
        errorToastingFunction(error?.response?.data?.message);
        router.push("/auth/forgetPassword");
      } else {
        errorToastingFunction("Something went wrong, Please try again later!");
        router.push("/auth/forgetPassword");
      }
    }
  };

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     localStorage.clear();
  //   }
  // }, []);

  useEffect(() => {
    verifyResetPassword();
  }, [token]);

  return (
    <div className="flex flex-col justify-center items-center h-[80vh] my-1">
      <h1 className="text-xl">Please wait a Moment...</h1>
      <Loader2 className="mr-2 h-8 w-8 animate-spin text-[#29354f]" />
    </div>
  );
};

export default ResetPasswordVerifypage;
