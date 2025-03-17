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
import { useWebsiteContentStore } from "@/Store/WebsiteContentStore";
import CustomPagination from "../CustomPagination/CustomPagination";
import { debounce } from "lodash";

const animatedComponents = makeAnimated();

const WebsiteContent: React.FC = () => {
  const router = useRouter();
  const { fetchWebsiteContentData, websiteContentData, loading } =
    useWebsiteContentStore();
  const [allWebsiteContent, setAllWebsiteContent] = useState<any>([]);
  const [loader, setLoader] = useState(true);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filtering, setFiltering] = React.useState("");
  const data = useMemo(() => allWebsiteContent, [allWebsiteContent]);
  const [filters, setFilters] = useState<any>({
    typeOfCustomer: [],
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
    if (
      websiteContentData === "Invalid refresh token" ||
      websiteContentData === "User not found" ||
      websiteContentData === "Invalid User Access Token" ||
      websiteContentData === "Invalid access token" ||
      websiteContentData === "Unauthorized request: No access or refresh token"
    ) {
      router.push("/auth/login");
    } else {
      setLoader(false);
      setAllWebsiteContent(
        websiteContentData ? websiteContentData?.newWebsiteContent || [] : []
      );
    }
  }, [websiteContentData?.newWebsiteContent, router]);

  const statusOptions = [
    { label: "Renewal", value: "Renewal" },
    {
      label: "New Customer",
      value: "New Customer",
    },
    { label: "Existing HOM Customer", value: "Existing HOM Customer" },
  ];

   useEffect(() => {
      if (searchInput !== "") {
        setPage(1);
      }
    }, [searchInput]);
  
    const debouncedSearch = useCallback(
      debounce((searchInput) => {
        fetchWebsiteContentData({
          page,
          limit,
          searchInput,
          filters,
        });
      }, 500),
      [fetchWebsiteContentData, filters, page, limit]
    );
  
    useEffect(() => {
      if (searchInput.trim().length > 0) {
        debouncedSearch(searchInput);
      } else {
        fetchWebsiteContentData({
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
    if (Array.isArray(websiteContentData)) {
      const filterByTypeofCustomer =
        websiteContentData &&
        websiteContentData?.filter((elem: any) => {
          if (filters?.typeOfCustomer?.length > 0) {
            return filters?.typeOfCustomer?.includes(elem?.typeOfCustomer);
          } else {
            return true;
          }
        });

      setAllWebsiteContent(filterByTypeofCustomer);
    }
  }, [filters?.typeOfCustomer, websiteContentData?.newWebsiteContent]);
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
        New Website Content
      </div> */}

      <div className="w-[300px] lg:absolute  z-50 mt-2 lg:mt-0">
        <Select
          className="text-[0.8rem] boxShadow"
          closeMenuOnSelect={false}
          components={animatedComponents}
          isClearable
          options={statusOptions}
          onChange={(selectedOption: any) => {
            const selectedValues = selectedOption ? selectedOption.value : [];
            setFilters((prev: any) => ({
              ...prev,
              typeOfCustomer: selectedValues,
            }));
            setPage(1);
          }}
          placeholder="Select type of customer"
          styles={{
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected
                ? "#29354f"
                : provided.backgroundColor,
              color: state.isSelected ? "white" : provided.color,
              ":hover": {
                backgroundColor: state.isSelected ? "#29354f" : "#f0f0f0",
              },
            }),
          }}
        />
      </div>

      <div className="md:flex justify-center sm:justify-end my-2">
        <PageHeader
          tableInstance={tableInstance}
          setSearchInput={setSearchInput}
        />

        <div className="flex justify-normal lg:justify-end">
          <Link href={"/websiteContent/addWebsiteContent"}>
            <Button
              variant="outline"
              className=" text-[0.8rem] text-white bg-[#29354f] hover:bg-[#fff] hover:text-[#29354f] boxShadow"
            >
              New Website Content
            </Button>
          </Link>
        </div>
      </div>

      <DataTable
        text="website-content"
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
        data={allWebsiteContent}
        totalPages={totalPages}
      />
    </div>
  );
};

export default WebsiteContent;
