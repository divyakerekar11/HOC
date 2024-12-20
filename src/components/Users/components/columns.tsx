"use client";
import { DataTableColumnHeader } from "../../common/data-table-column-header";
import { DataTableRowActions } from "../../common/data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import User from "../../../asset/images/user.png";
import Link from "next/link";

const UserPic = User.src;
export const columns = [
  // {
  //   accessorKey: "_id",
  //   header: ({ column }: any) => (
  //     <DataTableColumnHeader column={column} title="Sr. No." />
  //   ),
  //   cell: ({ row }: any) => row.index + 1,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "avatar",
    header: "Profile Picture",
    cell: ({ row }: any) => {
      return (
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={row?.original?.avatar} className="" />
            <AvatarFallback>
              <img src={UserPic} className="" />
            </AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "fullName",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="User Name" />
    ),
    cell: ({ row }: any) =>
      row?.original?.fullName ? (
        <Link href={`/users/userDetails/${row?.original?._id}`}>
          <span className="hover:underline hover:cursor-pointer text-nowrap">
            {row?.original?.fullName ? row?.original?.fullName : "N/A"}
          </span>
        </Link>
      ) : (
        <div className="text-gray-400">N/A</div>
      ),
  },
  {
    accessorKey: "email",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }: any) =>
      row?.original?.email ? (
        <span className="text-nowrap">
          {row?.original?.email ? row?.original?.email : "N/A"}
        </span>
      ) : (
        <div className="text-gray-400">N/A</div>
      ),
  },
  {
    accessorKey: "jobtitle",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Job Title" />
    ),
    cell: ({ row }: any) =>
      row?.original?.jobtitle ? (
        <span className="text-nowrap">
          {row?.original?.jobtitle ? row?.original?.jobtitle : "N/A"}
        </span>
      ) : (
        <div className="text-gray-400">N/A</div>
      ),
  },
  {
    accessorKey: "timeZone",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Time Zone" />
    ),
    // cell: ({ row }: any) => {
    //   return row?.original?.timeZone
    //     ? row?.original?.timeZone?.toUpperCase()
    //     : "-";
    // },
    cell: ({ row }: any) =>
      row?.original?.timeZone ? (
        <span className="text-nowrap">
          {row?.original?.timeZone ? row?.original?.timeZone : "N/A"}
        </span>
      ) : (
        <div className="text-gray-400">N/A</div>
      ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: any) => <DataTableRowActions row={row} />,
  },
];
