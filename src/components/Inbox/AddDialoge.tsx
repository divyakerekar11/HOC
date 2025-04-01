"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AllForm from "./AllForm";

const AddDialoge = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Button Section */}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-[0.9rem] text-white bg-gradient-to-t from-[#013642] to-[#006f6c] hover:bg-gradient-to-r hover:from-[#fff] hover:to-[#fff]hover:text-[#013642] border-0">

          Compose
        </Button>
      </DialogTrigger>

      {/* Form Section */}
      <DialogContent   className="sm:max-w-[700px] bg-[#e8f4f1] border-0 "
        aria-describedby="dialog-description">
        {/* <DialogHeader>
          <DialogTitle>New Add</DialogTitle>
        </DialogHeader> */}
        <AllForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddDialoge;
