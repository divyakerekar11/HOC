"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CustomerShowMoreDialoge({ row }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[100%]" onClick={(e) => e.stopPropagation()}>
          Show More
        </Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="sm:max-w-[80vw]"
      >
        <DialogHeader>
          <DialogTitle>Customer's Details</DialogTitle>
          <DialogDescription>Customer Details are :</DialogDescription>
        </DialogHeader>
        <div className="flex gap-20">
          <div className="">
            <Card className="min-w-[350px]">
              <CardHeader>
                <CardTitle>Customer Data</CardTitle>
                <CardDescription>Details Of existing Customer</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Customer Name  */}
                <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b">
                  <Label htmlFor="name" className="text-right font-bold">
                    Customer Name :
                  </Label>
                  <p className="mx-2">{row?.original?.contact_name}</p>
                </div>
                {/* Company Name  */}
                <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b">
                  <Label htmlFor="name" className="text-right font-bold">
                    Company Name :
                  </Label>
                  <p className="mx-2">{row?.original?.company_name}</p>
                </div>
                {/* Email  */}
                <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b">
                  <Label htmlFor="username" className="text-right font-bold">
                    Email :
                  </Label>
                  <p className="mx-2">{row?.original?.email_address}</p>
                </div>
                {/* Customer No.  */}
                <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b">
                  <Label htmlFor="username" className="text-right font-bold">
                    Customer No. :
                  </Label>
                  <p className="mx-2">{row?.original?.customer_no}</p>
                </div>
                {/* Contact No.  */}
                <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b">
                  <Label htmlFor="username" className="text-right font-bold">
                    Contact No :
                  </Label>
                  <p className="mx-2">{row?.original?.mobile_no}</p>
                </div>
                {/* Phone No.  */}
                {row?.original?.phone_no ? (
                  <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b">
                    <Label htmlFor="username" className="text-right font-bold">
                      Phone No :
                    </Label>
                    <p className="mx-2">{row?.original?.phone_no}</p>
                  </div>
                ) : (
                  ""
                )}
                {/* Address  */}
                {row?.original?.address ? (
                  <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b">
                    <Label htmlFor="username" className="text-right font-bold">
                      Address :
                    </Label>
                    <p className="mx-2">{row?.original?.address}</p>
                  </div>
                ) : (
                  ""
                )}
              </CardContent>
            </Card>
          </div>
          <div></div>
        </div>
        {/* <DialogFooter>
          <Button type="submit">Close</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
