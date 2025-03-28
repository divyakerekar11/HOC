"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddAppointmentForm from "./AddAppointmentForm";
import { useParams, useRouter } from "next/navigation";

// Type Defined

export function AddAppointmentDialoge() {
  const router = useRouter();
  const { leadId } = useParams();
  const leadIdString = Array.isArray(leadId) ? leadId[0] : leadId;
  const goToLeadsDetails = () => {
    router.push(`/leads/leadsDetails/${leadId}`);
  };

  return (
    // <Dialog open={open} onOpenChange={setOpen}>
    //   <DialogTrigger asChild>
    //     <Button className="py-1 " onClick={(e) => e.stopPropagation()}>
    //       Book an Appointment
    //     </Button>
    //     <Button
    //       className="mt-8 w-full  px-3 py-2 text-[0.8rem] font-semibold text-white shadow hover:bg-[#013642] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //       onClick={(e) => e.stopPropagation()}
    //     >
    //       Book an Appointment
    //     </Button>
    //     {userRole === 2 ? (
    //       <Button className="w-[100%]" onClick={(e) => e.stopPropagation()}>
    //         Edit
    //       </Button>
    //     ) : (
    //       ""
    //     )}
    //   </DialogTrigger>
    //   <DialogContent
    //     className="sm:max-w-[775px]"
    //     onClick={(e) => e.stopPropagation()}
    //   >
    //     <DialogHeader>
    //       <DialogTitle>Book An Appointment</DialogTitle>
    //       <DialogDescription>Book a New Appointment here.</DialogDescription>
    //     </DialogHeader>
    //     <AddAppointmentForm
    //       leadId={leadId}
    //       setOpen={setOpen}
    //       getAppointmentsAtSelectedDate={getAppointmentsAtSelectedDate}
    //     />
    //   </DialogContent>
    // </Dialog>
    <>
      <div className="text-[1rem] font-semibold absolute top-[14px] px-2">
        Add Appointment
      </div>

      <div className="px-4 py-0 relative flex justify-center text-[0.9rem] pt-12">
        <div
          className=" p-2 w-fit h-fit mx-5 text-white cursor-pointer hover:bg-[#fff] bg-[#013642] hover:text-black boxShadow border-0 rounded-lg"
          onClick={goToLeadsDetails}
        >
          Back
        </div>
        <div className="flex justify-center w-[50vw] bg-[#fff] boxShadow label-text border-0 rounded-lg slider-in ">
          <div className="flex justify-center w-[50vw] ">
            <div className="w-full p-3">
              <AddAppointmentForm leadId={leadIdString} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
