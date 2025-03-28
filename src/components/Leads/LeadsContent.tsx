"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { columns } from "./components/columns";
import { DataTable } from "../common/data-table";
import AddLeadDialoge from "./components/AddLeadDialoge";
import BreadcrumbSection from "../common/BreadcrumbSection";
import { useLeadStore } from "@/Store/LeadStore";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import Select from "react-select";
import PageHeader from "../common/PageHeader";
import makeAnimated from "react-select/animated";
import Link from "next/link";
import { Button } from "../ui/button";
import SideDrawer from "../common/Editor/SideDrawer";
import { debounce } from "lodash";
import CustomPagination from "../CustomPagination/CustomPagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const animatedComponents = makeAnimated();

const crumbs = [
  {
    id: 1,
    title: "Home",
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Leads",
    link: "/leads",
  },
];

const LeadsContent: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  const { fetchAllLeadData, leadData, loading }: any = useLeadStore();
  const searchParams = useSearchParams();
  const queryParams = searchParams.get("id");
  const router = useRouter();
  const [allLeads, setAllLeads] = useState([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filtering, setFiltering] = React.useState("");

  const [filters, setFilters] = useState<any>({
    outcome: [],
  });
  const pathname = usePathname();
  const data = useMemo(() => allLeads, [allLeads]);
  const [searchInput, setSearchInput] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialLimit = Number(searchParams.get("limit")) || 20;
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [loader, setLoader] = useState(true);
  // useEffect(() => {
  //   fetchAllLeadData();
  // }, []);

  const outcome = [
    { label: "Appointement Made", value: "Appointement Made" },
    { label: "Callback", value: "Callback" },
    { label: "Not Interseted", value: "Not Interseted" },
    { label: "Old Client", value: "Old Client" },
    { label: "Arrange an Appointment", value: "Arrange an Appointment" },
  ];

  useEffect(() => {
    if (
      leadData === "Invalid refresh token" ||
      leadData === "User not found" ||
      leadData === "Invalid User Access Token" ||
      leadData === "Invalid access token" ||
      leadData === "Unauthorized request: No access or refresh token"
    ) {
      router.push("/auth/login");
    } else {
      setAllLeads(leadData ? leadData?.leads || [] : []);
    }
  }, [leadData?.leads, leadData, router]);

  // const debouncedSearch = useCallback(
  //   debounce((input) => {
  //     fetchAllLeadData({ page, limit, searchInput: input, filters });
  //   }, 500),
  //   [fetchAllLeadData, filters, page, limit]
  // );

  // useEffect(() => {
  //   debouncedSearch(searchInput);
  //   return () => debouncedSearch.cancel();
  // }, [searchInput, page, limit, filters, debouncedSearch]);

  useEffect(() => {
    if (searchInput !== "") {
      setPage(1);
    }
  }, [searchInput]);

  const debouncedSearch = useCallback(
    debounce((searchInput) => {
      fetchAllLeadData({
        page,
        limit,
        searchInput,
        filters,
      });
    }, 500),
    [fetchAllLeadData, filters, page, limit]
  );

  useEffect(() => {
    if (searchInput.trim().length > 0) {
      debouncedSearch(searchInput);
    } else {
      fetchAllLeadData({
        page,
        limit,
        searchInput,
        filters,
      });
    }
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchInput, debouncedSearch, page, limit, filters]);

  useEffect(() => {
    if (leadData && leadData?.leads) {
      setLoader(false);
      setAllLeads(leadData?.leads || []);
      setTotalPages(leadData?.totalPages);
    }
  }, [leadData]);

  useEffect(() => {
    if (Array.isArray(leadData?.leads)) {
      const filterByStatus =
        leadData?.leads &&
        leadData?.leads?.filter((elem: any) => {
          if (filters?.outcome?.length > 0) {
            return filters?.outcome?.includes(elem?.outcome);
          } else {
            return true;
          }
        });

      setAllLeads(filterByStatus);
    }
  }, [filters?.outcome, leadData?.leads]);

  const tableInstance = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 25,
      },
    },
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      globalFilter: filtering,
      columnFilters,
    },
    onGlobalFilterChange: setFiltering,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const onPageChange = (newPage: number, newLimit: number) => {
    setPage(newPage);
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", newPage.toString());
    params.set("limit", newLimit.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="px-4 py-0 relative">
      <div className="w-[300px] lg:absolute z-10 mt-2 lg:mt-0">
        <Select
          // className="text-[0.8rem] boxShadow"
              className="react-select-custom-styling__container"
          classNamePrefix="react-select-custom-styling"
          closeMenuOnSelect={false}
          components={animatedComponents}
          isClearable
          options={outcome}
          onChange={(selectedOption: any) => {
            const selectedValues = selectedOption ? selectedOption.value : [];
            setFilters((prev: any) => ({
              ...prev,
              outcome: selectedValues,
            }));
            setPage(1);
          }}
          placeholder="Select a Outcome"
          // styles={{
          //   option: (provided, state) => ({
          //     ...provided,
          //     backgroundColor: state.isSelected
          //       ? "#013642"
          //       : provided.backgroundColor,
          //     color: state.isSelected ? "white" : provided.color,
          //     ":hover": {
          //       backgroundColor: state.isSelected ? "#013642" : "#f0f0f0",
          //     },
          //   }),
          // }}
        />
      </div>

      <div className="md:flex justify-center sm:justify-end my-2">
        <PageHeader
          tableInstance={tableInstance}
          setSearchInput={setSearchInput}
        />

        {/* <AddLeadDialoge getMyLeadData={fetchAllLeadData} /> */}
        <div className="flex justify-normal lg:justify-end ">
          <Link href={"/leads/addLead"}>
            <Button
              variant="outline"
              className=" text-[0.8rem] text-white bg-[#013642] hover:bg-[#fff] hover:text-[#013642] boxShadow border-0 rounded-lg"
            >
              New Lead
            </Button>
          </Link>
        </div>
      </div>
      <DataTable
        text="lead"
        queryParams={queryParams ? queryParams : ""}
        columns={columns}
        tableInstance={tableInstance}
        loading={loading}
      />

      <CustomPagination
        setLimit={setLimit}
        limit={limit}
        page={page}
        onPageChange={onPageChange}
        data={allLeads}
        totalPages={totalPages}
      />
    </div>
  );
};

export default LeadsContent;
