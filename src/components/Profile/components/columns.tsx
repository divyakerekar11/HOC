"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "../../ui/badge";
import { Checkbox } from "../../ui/checkbox";

// import { labels, priorities, statuses } from "../data/data";
// import { Task } from "../data/schema";
import { DataTableColumnHeader } from "../../common/data-table-column-header";
import { DataTableRowActions } from "../../common/data-table-row-actions";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper();

export const columns = [
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
    accessorKey: "order_date",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Order Date" />
    ),
    cell: (info: any) => info.renderValue(),
  },

  {
    accessorKey: "order_value",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Order Value" />
    ),
    cell: (info: any) => info.renderValue(),
  },
  {
    accessorKey: "order_status",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),

    cell: (info: any) => info.renderValue(),
  },

  // {
  //   id: "actions",
  //   header: "Actions",
  //   cell: ({ row }: any) => <DataTableRowActions row={row} />,
  // },
];
