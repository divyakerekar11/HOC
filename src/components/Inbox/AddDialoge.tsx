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
          className="text-[0.9rem] text-white bg-[#013642] hover:bg-[#fff] hover:text-[#013642] border-0 rounded-lg"
        >
          Compose
        </Button>
      </DialogTrigger>

      {/* Form Section */}
      <DialogContent   className="sm:max-w-[700px]"
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
