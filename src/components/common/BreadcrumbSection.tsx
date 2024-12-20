"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const BreadcrumbSection = ({ crumbs }: any) => {
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {crumbs &&
          crumbs.map((crumb: any) => {
            return (
              <React.Fragment key={crumb.id}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={crumb?.link}>{crumb?.title}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            );
          })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbSection;
