"use client";
import { SearchIconSVG } from "@/utils/SVGs/SVGs";
import React, { useState } from "react";

const PageHeader = ({ tableInstance, setSearchInput }: any) => {
  const { initialState, options } = tableInstance;

  const searcHandler = (value: any) => {
    setSearchInput(value);
  };
  return (
    <div className="relative flex items-center md:mx-4 my-3 md:my-0">
      <span className="absolute pl-2">
        <SearchIconSVG />
      </span>
      <input
        className="input-field w-100  border-1 text-[0.9rem] border-gray-400 py-[0.42rem]  px-[2rem] outline-none boxShadow border-0 rounded-lg"
        type="text"
        placeholder="Search"
        // value={initialState?.globalFilter?.filtering || ""}
        // onChange={(e) => {
        //   options.onGlobalFilterChange(e.target.value);
        // }}
        onChange={(e: any) => {
          searcHandler(e.target.value);
        }}
      />
    </div>
  );
};

export default PageHeader;
