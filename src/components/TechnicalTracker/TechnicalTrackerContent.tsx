"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { columns } from "./components/columns";
import { DataTable } from "../common/data-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BreadcrumbSection from "../common/BreadcrumbSection";

import Select from "react-select";
import makeAnimated from "react-select/animated";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
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
import { useAmendmentStore } from "@/Store/AmendmentStore";
import AddTechnicalDialoge from "./components/AddTechnicalDialoge";
import TechnicalPage from "@/app/technical/page";
import { useTechnicalStore } from "@/Store/TechnicalStore";
import CustomPagination from "../CustomPagination/CustomPagination";
import { debounce } from "lodash";
const animatedComponents = makeAnimated();

// Crumbs Array
const crumbs = [
  {
    id: 1,
    title: "Home",
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Technical Tracker",
    link: "",
  },
];

const TechnicalTrackerContent: React.FC = () => {
  // Hooks and States
  const router = useRouter();
  const { fetchTechnicalData, technicalData, loading } = useTechnicalStore();
  const [allTechnicals, setAllTechnicals] = useState<any>([]);


  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filtering, setFiltering] = React.useState("");
  const [statusValue, setStatusValue] = React.useState("");
  const data = useMemo(() => allTechnicals, [allTechnicals]);
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
    const [loader, setLoader] = useState(true);
  

  // const statusOptions = [
  //   { label: "In Progress", value: "In Progress" },
  //   { label: "In Query", value: "In Query" },
  //   { label: "Completed", value: "Completed" },
  // ];




  useEffect(() => {
      if (searchInput !== "") {
        setPage(1);
      }
    }, [searchInput]);
  
    const debouncedSearch = useCallback(
      debounce((searchInput) => {
        fetchTechnicalData({
          page,
          limit,
          searchInput,
          filters,
        });
      }, 500),
      [fetchTechnicalData, filters, page, limit]
    );
  
    useEffect(() => {
      if (searchInput.trim().length > 0) {
        debouncedSearch(searchInput);
      } else {
        fetchTechnicalData({
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
      technicalData === "Invalid refresh token" ||
      technicalData === "User not found" ||
      technicalData === "Invalid User Access Token" ||
      technicalData === "Invalid access token" ||
      technicalData === "Unauthorized request: No access or refresh token"
    ) {
      router.push("/auth/login");
    } else {
      setLoader(false);
      setAllTechnicals(technicalData ? technicalData?.trackers || [] : []);
    }
  }, [technicalData?.trackers, router]);



  const statusOptions = [
    { label: "In Process", value: "In Process" },
    { label: "In Query", value: "In Query" },
    { label: "Complete", value: "Complete" },
    { label: "Back With Repo", value: "Back With Repo" },
  ];

  useEffect(() => {
    if (Array.isArray(technicalData?.trackers)) {
      const filterByStatus =
        technicalData?.trackers &&
        technicalData?.trackers.filter((elem: any) => {
          if (filters?.status?.length > 0) {
            return filters?.status?.includes(elem?.status);
          } else {
            return true;
          }
        });

      setAllTechnicals(filterByStatus);
    }
  }, [filters?.status, technicalData?.trackers]);

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
      {/* <div className="text-xl font-semibold absolute top-[-50px]">
        Technical Tracker
      </div> */}

      <div className="w-[300px] lg:absolute z-50 mt-2 lg:mt-0">
        <Select
          // className="text-[0.8rem] boxShadow"
             className="react-select-custom-styling__container"
                  classNamePrefix="react-select-custom-styling"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isClearable
                  options={statusOptions}
                  onChange={(selectedOption: any) => {
                    const selectedValues = selectedOption ? selectedOption.value : [];
                    setFilters((prev: any) => ({
                      ...prev,
                      status: selectedValues,
                    }));
                    setPage(1);
                  }}
          placeholder="Select a Status"
        />
      </div>

      <div className="md:flex justify-center sm:justify-end my-2">
        <PageHeader
          tableInstance={tableInstance}
          setSearchInput={setSearchInput}
        />

        <AddTechnicalDialoge getAllTechnical={fetchTechnicalData} />
      </div>

      <DataTable
        text="technical"
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
        data={allTechnicals}
        totalPages={totalPages}
      />
    </div>
  );
};

export default TechnicalTrackerContent;
