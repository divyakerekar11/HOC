"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { columns } from "./components/columns";
import { DataTable } from "../common/data-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import PageHeader from "../common/PageHeader";
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
import { useCopywriterStore } from "@/Store/CopywriterStore";
import { useTableInstance } from "@/utils/Modules/useTableInstance";
import { debounce } from "lodash";
import CustomPagination from "../CustomPagination/CustomPagination";
const animatedComponents = makeAnimated();

const CopywriterContent: React.FC = () => {
  const router = useRouter();
  const {
    fetchCopywriterData,
    copywriterData,
    currentPage,
    totalCopywriterTrackers,

    loading,
  } = useCopywriterStore();
  const [allCopywriter, setAllCopywriter] = useState<any>([]);
  const [loader, setLoader] = useState(true);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filtering, setFiltering] = React.useState("");
  const data = useMemo(() => allCopywriter, [allCopywriter]);
  const [filters, setFilters] = useState<any>({
    status: [],
  });
  const searchParams = useSearchParams();
  const queryParams = searchParams.get("id");

  const pathname = usePathname();

  const [searchInput, setSearchInput] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialLimit = Number(searchParams.get("limit")) || 20;
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);



 useEffect(() => {
    if (searchInput !== "") {
      setPage(1);
    }
  }, [searchInput]);

  const debouncedSearch = useCallback(
    debounce((searchInput) => {
      fetchCopywriterData({
        page,
        limit,
        searchInput,
        filters,
      });
    }, 500),
    [fetchCopywriterData, filters, page, limit]
  );

  useEffect(() => {
    if (searchInput.trim().length > 0) {
      debouncedSearch(searchInput);
    } else {
      fetchCopywriterData({
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
    if (
      copywriterData === "Invalid refresh token" ||
      copywriterData === "User not found" ||
      copywriterData === "Invalid User Access Token" ||
      copywriterData === "Invalid access token" ||
      copywriterData === "Unauthorized request: No access or refresh token"
    ) {
      router.push("/auth/login");
    } else {
      setLoader(false);
      setAllCopywriter(
        copywriterData ? copywriterData?.copywriterTrackers || [] : []
      );
    }
  }, [copywriterData?.copywriterTrackers, router]);

  const statusOptions = [
    { label: "Homepage In Process", value: "Homepage In Process" },
    { label: "Rework", value: "Rework" },
    {
      label: "Additional Pages in Process",
      value: "Additional Pages in Process",
    },
    { label: "In Query", value: "In Query" },
    { label: "Homepage Complete", value: "Homepage Complete" },

    {
      label: "Remaining Pages in Process",
      value: "Remaining Pages in Process",
    },

    { label: "COMPLETED", value: "COMPLETED" },
    { label: "Held for Critical", value: "Held for Critical" },

    { label: "Waiting on Info", value: "Waiting on Info" },

    { label: "COMPLETED REWORK", value: "COMPLETED REWORK" },

    { label: "Area Pages Remaining", value: "Area Pages Remaining" },
    { label: "Blog pages", value: "Blog pages" },
    { label: "Extra Pages", value: "Extra Pages" },
  ];

  useEffect(() => {
    if (Array.isArray(copywriterData)) {
      const filterByStatus =
        copywriterData &&
        copywriterData?.filter((elem: any) => {
          if (filters?.status?.length > 0) {
            return filters?.status?.includes(elem?.status);
          } else {
            return true;
          }
        });

      setAllCopywriter(filterByStatus);
    }
  }, [filters?.status, copywriterData]);

  const tableInstance = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 20,
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
      {/* <div className="text-xl font-semibold absolute top-[-52px]">
        Copywriter Tracker
      </div> */}

      <div className="w-[300px] lg:absolute  z-50 mt-2 lg:mt-0">
        <Select
          className="text-[0.8rem] boxShadow"
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={statusOptions}
          onChange={(selectedOptions) => {
            const selectedValues =
              selectedOptions &&
              selectedOptions.map((option: any) => option.value);
            setFilters((prev: any) => ({
              ...prev,
              status: selectedValues,
            }));
          }}
          placeholder="Select Status"
        />
      </div>

      <div className="md:flex justify-center sm:justify-end my-2">
        <PageHeader
          tableInstance={tableInstance}
          setSearchInput={setSearchInput}
        />

        <div className="flex justify-normal lg:justify-end">
          <Link href={"/copywriter/addCopywriter"}>
            <Button
              variant="outline"
              className=" text-[0.8rem] text-white bg-[#29354f] hover:bg-[#fff] hover:text-[#29354f] boxShadow"
            >
              New Copywriter Tracker
            </Button>
          </Link>
        </div>
      </div>

      <DataTable
        text="copywriter"
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
        data={allCopywriter}
        totalPages={totalPages}
      />
    </div>
  );
};

export default CopywriterContent;
