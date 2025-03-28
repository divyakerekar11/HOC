"use client";

import * as React from "react";
import "../../styles/common.css";
import { ColumnDef, flexRender } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { LoaderIconSVG } from "@/utils/SVGs/SVGs";
import "../../styles/common.css";
import { ScrollArea } from "../ui/scroll-area";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  tableInstance: any;
  loading: boolean;
  queryParams: string;
  text: string;
}

export function DataTable<TData, TValue>({
  queryParams,
  columns,
  tableInstance,
  loading,
  text,
}: DataTableProps<TData, TValue>) {


  return (
    <div className="space-y-4 text-[#676879]">
      {/* <div className="border">
       */}
         <div className="">
        <div className="h-[82vh] overflow-x-auto bg-[#E8F4F1] boxShadow slide-in first:rounded-tl-lg last:rounded-tr-lg">
         <Table className="bg-[#E8F4F1] ">
            <TableHeader className="bg-[#013642] " >
              {tableInstance?.getHeaderGroups()?.map((headerGroup: any) => (
                <TableRow key={headerGroup?.id} className="">
                  {headerGroup?.headers?.map((header: any) => (
                    <TableHead
                      key={header?.id}
                      colSpan={header?.colSpan}
                      className={`text-nowrap text-white`}
                    >
                      {header?.isPlaceholder
                        ? null
                        : flexRender(
                            header?.column?.columnDef?.header,
                            header?.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24">
                    <div className="flex justify-center">
                      <LoaderIconSVG />
                      <span className="px-2">Loading...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : tableInstance?.getRowModel()?.rows?.length !== 0 ? (
                tableInstance.getRowModel().rows.map((row: any, index: number) => {
                  const isHighlighted = row.original._id === queryParams; 
                  // const rowClass = index % 2 === 0 ? "bg-[#F2FBF9]" : "bg-[#D1E7E2]";
                  // index % 2 === 0 ? "bg-[#fff]" : "bg-[#e8f4f1]";
    
                  return (
                    <TableRow
                      key={row.id}
                      // className={`${rowClass} ${isHighlighted ? "bg-[#ced7ea] " : ""}`}
                      className={isHighlighted ? "bg-[#ced7ea]" : ""}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell: any) => (
                        <TableCell key={cell.id} className="text-nowrap">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <div role="status" className="flex justify-center">
                      No data Found !!
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {text === "orders" || text === "cutomer" || text === "amendment" || text === "lead" || text === "technical" ||  text === "product-flow"|| text === "copywriter" || text === "website-content"? (
        ""
      ) : (
        <DataTablePagination table={tableInstance} />
      )}
    </div>
  );
}
// "use client";

// import * as React from "react";
// import "../../styles/common.css";
// import { ColumnDef, flexRender } from "@tanstack/react-table";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";

// import { DataTablePagination } from "./data-table-pagination";
// import { LoaderIconSVG } from "@/utils/SVGs/SVGs";
// import { ScrollArea } from "../ui/scroll-area";
// import SideDrawer from "./Editor/SideDrawer";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   tableInstance: any;
//   loading: boolean;
//   queryParams: string; // Query params that will match the row for highlighting and opening SideDrawer
//   text: string;
// }

// export function DataTable<TData, TValue>({
//   queryParams,
//   columns,
//   tableInstance,
//   loading,
//   text,
// }: DataTableProps<TData, TValue>) {
//   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

//   // Track the previously passed queryParams to avoid unnecessary SideDrawer openings
//   const prevQueryParams = React.useRef<string | null>(null);

//   // Automatically open the sidebar only when queryParams changes
//   React.useEffect(() => {
//     const debounceTimeout = setTimeout(() => {
//       if (queryParams && queryParams !== prevQueryParams.current) {
//         setIsSidebarOpen(true); // Open the sidebar
//         prevQueryParams.current = queryParams;
//       }
//     }, 300); // Delay the opening to avoid rapid triggering

//     return () => clearTimeout(debounceTimeout); // Clean up previous timeouts
//   }, [queryParams]);

//   return (
//     <div className="space-y-4 text-[#676879]">
//       <div className="border">
//         <div className="h-[82vh] overflow-x-auto bg-[#fff] boxShadow">
//           <Table className="bg-[#fff]">
//             <TableHeader className="bg-[#29354f] sticky top-0 z-0">
//               {tableInstance?.getHeaderGroups()?.map((headerGroup: any) => (
//                 <TableRow key={headerGroup?.id}>
//                   {headerGroup?.headers?.map((header: any) => (
//                     <TableHead
//                       key={header?.id}
//                       colSpan={header?.colSpan}
//                       className={`text-nowrap text-white`}
//                     >
//                       {header?.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header?.column?.columnDef?.header,
//                             header?.getContext()
//                           )}
//                     </TableHead>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableHeader>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={columns.length} className="h-24">
//                     <div className="flex justify-center">
//                       <LoaderIconSVG />
//                       <span className="px-2">Loading...</span>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ) : tableInstance?.getRowModel()?.rows?.length !== 0 ? (
//                 tableInstance.getRowModel().rows.map((row: any) => {
//                   const isHighlighted = row.original._id === queryParams; // Highlight the row if it matches queryParams
//                   return (
//                     <TableRow
//                       key={row.id}
//                       className={isHighlighted ? "bg-[#ced7ea]" : ""} // Apply highlight class if it matches
//                     >
//                       {row.getVisibleCells().map((cell: any) => (
//                         <TableCell key={cell.id} className="text-nowrap">
//                           {flexRender(
//                             cell.column.columnDef.cell,
//                             cell.getContext()
//                           )}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   );
//                 })
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={columns.length}
//                     className="h-24 text-center"
//                   >
//                     <div role="status" className="flex justify-center">
//                       No data Found !!
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </div>

//       {text === "orders" || text === "customer" ? (
//         ""
//       ) : (
//         <DataTablePagination table={tableInstance} />
//       )}

//       {/* Sidebar for detailed view */}
//       {/* {isSidebarOpen && (
//         <SideDrawer
//           amendmentId={queryParams} // Passing the queryParams as the amendment ID to the SideDrawer
//           onClose={() => setIsSidebarOpen(false)} // Close sidebar on close
//         />
//       )} */}
//     </div>
//   );
// }
