"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "../../ui/badge";
import { Checkbox } from "../../ui/checkbox";

import { labels, priorities, statuses } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "../../common/data-table-column-header";
import { DataTableRowActions } from "../../common/data-table-row-actions";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper();

const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US");
  return formattedDate;
};

export const appointmentColumns = [
  {
    accessorKey: "id",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Sr. No." />
    ),
    cell: ({ row }: any) => row.index + 1,
    // enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: "contactName",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }: any) => row?.original?.customer_id?.contactName,
  },
  {
    accessorKey: "companyName",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Company Name" />
    ),

    cell: ({ row }: any) => row?.original?.customer_id?.companyName,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }: any) => {
      const createdAt = row?.original?.customer_id?.createdAt;
      return formatDate(createdAt);
    },
  },
  // {
  //   accessorKey: "createdAt",
  //   header: ({ column }: any) => (
  //     <DataTableColumnHeader column={column} title="Created At" />
  //   ),
  //   cell: ({ row }: any) => {
  //     const createdAt = row?.original?.customer_id?.createdAt;
  //     return formatDate(createdAt);
  //   },
  // },
  // {
  //   accessorKey: "rep_name",
  //   header: "Representative",
  //   cell: ({ row }: any) => {
  //     const profilePic = row.original?.rep_pic;
  //     const imgUrl = profilePic
  //       ? `https://crm.neelnetworks.org/${profilePic}`
  //       : "https://neelnetworks.org/dummy.jpg";
  //     return (
  //       <div className="flex items-center">
  //         <Avatar>
  //           <AvatarImage src={imgUrl} className="h-12" />
  //           <AvatarFallback>CN</AvatarFallback>
  //         </Avatar>
  //         <span className="mx-4">{row.original.rep_name}</span>
  //       </div>
  //     );
  //   },
  // },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: any) => <DataTableRowActions row={row} />,
  },
];
