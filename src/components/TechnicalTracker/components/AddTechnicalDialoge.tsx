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
import AddTechnicalForm from "./AddTechnicalForm";

type FetchTechnicalDataParams = {
  page?: number;
  limit?: number;
  searchInput?: string;
  filters?: { status?: string }[];
};

interface AddTechnicalDialogeProps {
  getAllTechnical: (params: FetchTechnicalDataParams) => Promise<void>;
}

const AddTechnicalDialoge = ({ getAllTechnical }: AddTechnicalDialogeProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Button Section  */}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-[0.8rem] text-white bg-gradient-to-t from-[#013642] to-[#006f6c] hover:bg-gradient-to-r hover:from-[#fff] hover:to-[#fff]hover:text-[#013642] hover:text-[#013642]"
        >
          New Technical
        </Button>
      </DialogTrigger>
      {/* form Section  */}
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add New Technical </DialogTitle>
        </DialogHeader>
        <AddTechnicalForm setOpen={setOpen} getAllTechnical={getAllTechnical} />
      </DialogContent>
    </Dialog>
  );
};

export default AddTechnicalDialoge;
