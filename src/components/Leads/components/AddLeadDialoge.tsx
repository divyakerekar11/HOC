"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AddLeadsForm from "./AddLeadsForm";
const AddLeadDialoge = ({ getMyLeadData }: { getMyLeadData: () => void }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Button Section  */}
      <DialogTrigger>
        <Button
          // onClick={() => setOpen(true)}
          variant="outline"
          className="text-[0.8rem] text-white bg-[#013642] hover:bg-[#fff] hover:text-[#013642]"
        >
          New Lead
        </Button>
      </DialogTrigger>
      {/* form Section  */}
      <DialogContent className="sm:max-w-[775px]">
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
          {/* <DialogDescription>Add New Lead here</DialogDescription> */}
        </DialogHeader>
        {/* <AddLeadsForm getMyLeadData={getMyLeadData} setOpen={setOpen} /> */}
        <AddLeadsForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddLeadDialoge;
