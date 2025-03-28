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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

export function UserShowMoreDialoge({ row }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[100%]" onClick={(e) => e.stopPropagation()}>
          Show More
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="sm:max-w-[80vw]"
      >
        <DialogHeader>
          <DialogTitle>User's Details</DialogTitle>
          <DialogDescription>User Details are :</DialogDescription>
        </DialogHeader>
        <div className="flex gap-20">
          <div>
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>User Data</CardTitle>
                <CardDescription>Details Of existing User</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Profile Picture  */}
                <div className="flex items-center mb-2">
                  <Avatar className="h-32 w-28">
                    {/* <AvatarImage
                      src={
                        JSON.parse(row?.original?.additionalData?.users_metas)
                          ?.profile_picture
                          ? `https://crm.neelnetworks.org/${
                              JSON.parse(
                                row?.original?.additionalData?.users_metas
                              )?.profile_picture
                            }`
                          : "https://neelnetworks.org/dummy.jpg"
                      }
                      alt={row?.original.name}
                    /> */}
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                {/* Name  */}
                <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b">
                  <Label htmlFor="name" className="text-right font-bold">
                    Name :
                  </Label>
                  <p className="mx-2">{row?.original?.name}</p>
                </div>

                {/* Email  */}
                <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b">
                  <Label htmlFor="username" className="text-right font-bold">
                    Email :
                  </Label>
                  <p className="mx-2">{row?.original?.email}</p>
                </div>
                {/* Contact No.  */}
                <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b">
                  <Label htmlFor="username" className="text-right font-bold">
                    Contact No :
                  </Label>
                  <p className="mx-2">
                    {/* {
                      JSON.parse(row?.original?.additionalData?.users_metas)
                        ?.contact_no
                    } */}
                  </p>
                </div>
                {/* Address  */}
                <div className="flex items-center pb-[10px] mb-[10px]  border-b-[#ddd] border-b">
                  <Label htmlFor="username" className="text-right font-bold">
                    Address :
                  </Label>
                  <p className="mx-2">
                    {/* {
                      JSON.parse(row?.original?.additionalData?.users_metas)
                        ?.address
                    } */}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <h1>Other Options</h1>
          </div>
        </div>

        {/* <DialogFooter>
          <Button type="submit">Close</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
