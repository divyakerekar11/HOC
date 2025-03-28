"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddAmendmentForm from "./AddAmendmentForm";
// import AddUserForm from "./AddUserForm";

const AddAmendmentDialoge = ({
  getAllAmendment,
}: {
  getAllAmendment: () => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Button Section  */}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-[0.8rem] text-white bg-[#013642] hover:bg-[#fff] hover:text-[#013642] boxShadow"
        >
          New Amendment
        </Button>
      </DialogTrigger>
      {/* form Section  */}
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add New Amendment</DialogTitle>
          {/* <DialogDescription>Add New User here</DialogDescription> */}
        </DialogHeader>
        <AddAmendmentForm setOpen={setOpen} getAllAmendment={getAllAmendment} />
      </DialogContent>
    </Dialog>
  );
};

export default AddAmendmentDialoge;
