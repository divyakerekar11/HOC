"use client";
import {
  baseInstance,
  errorToastingFunction,
  getUserToken,
  successToastingFunction,
} from "@/common/commonFunctions";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import Logo from "../../asset/images/logo.png";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Forgetpass from "../../asset/images/forgetpass.png";
import Employees from "../../asset/images/employees.png";

// Defined Type of state
type User = {
  email: string;
};

const ForgetPasswordPic = Forgetpass.src;

const LogoPic = Logo.src;
const EmployeesPic = Employees.src;

const ForgetPassword: React.FC = () => {
  // Default States
  const [user, setUser] = useState<User>({
    email: "",
  });

  const [isUserValid, setIsUserValid] = useState(false);

  //OncChnage handler function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prev) => ({ ...prev, [id]: value }));
  };

  // Login Api Calling function
  const handleForgetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const result = await baseInstance.post("/users/forget", user);
      setUser({ email: "" });
      if (result.status === 200) {
        successToastingFunction(result.data.message);
      } else {
        throw new Error("Something went wrong, Please try again later!");
      }
    } catch (error: any) {
      if (
        error?.response &&
        error?.response?.data &&
        error?.response?.data?.message
      ) {
        errorToastingFunction(error?.response?.data?.message);
      } else {
        errorToastingFunction(error?.response?.data.error);
      }
    } finally {
      setIsUserValid(() => false);
    }
  };

  // Validation before api Calling
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.email) {
      setIsUserValid(() => true);
      handleForgetPassword(e);
    } else {
      handleForgetPassword(e);
    }
  };

  const token = getUserToken();

  useEffect(() => {
    if (token) {
      redirect("/dashboard"); // Redirect to home if not authenticated
    }
  }, [token]);

  return (
    <section className="w-[100%] h-[100vh] ">
      <div className="flex create-account justify-center h-[100%] backgroundSignIn items-center">
        <div className="hidden lg:block h-[47rem]">
          <img
            src={EmployeesPic}
            alt="EmployeesPic"
            className="h-[100%]"
            style={{
              width: "100%",
              borderRadius: "26px 0px 0px 26px",
              boxShadow: "0 5px 25px 0 rgba(50,50,93,.25)",
            }}
          />
        </div>
        <div
          className="h-[47rem] bg-white backgroundLogin flex justify-center items-center flex-col px-[2.50rem] lg:px-[3.50rem] lg:ml-[-23px]"
          style={{
            borderRadius: "26px 26px 26px 26px",
            boxShadow: "0 5px 25px 0 rgba(50,50,93,.25)",
          }}
        >
          <div className="text-[24px] lh-[29.43px] font-[700] text-center my-5 tracking-[0.3rem]">
            Forgot Password?
          </div>
          <div>Enter your email to receive a password reset link.</div>
          <form
            className="flex flex-col gap-5 relative mb-3 mt-[85px]"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Email Address"
              id="email"
              name="email"
              value={user.email}
              onChange={(e) => handleChange(e)}
              className=" border-b border-b-gray-300 outline-none py-4 w-[502.4px] bg-transparent px-3"
            />

            <div className="mt-20 ">
              <Button
                type="submit"
                className="bg-[#013642] rounded-[8px] w-[502px] h-[48px] p-[10px] text-white font-[700] tracking-[0.1rem]"
              >
                {isUserValid ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <span className="text-[1rem]">Submit</span>
                )}
              </Button>
            </div>
          </form>
          <div className="my-4 items-start ">
            <Link href="/auth/login" className="">
              <span className="text-gray-400 mx-3">Go back to login page</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
