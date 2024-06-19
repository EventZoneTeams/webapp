"use client";

import Link from "next/link";
import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export function MyBreadcrumb() {
  const pathname = usePathname();
  const splitPath = pathname.split("/").filter((path) => path !== "");
  const uppercaseFirstLetter = (path: string) => {
    if (path.includes("-")) {
      path = path.replace(/-/g, " ");
    }
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {splitPath.map((path, index) => {
          const isLast = index === splitPath.length - 1;
          const url = `/${splitPath.slice(0, index + 1).join("/")}`;
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem key={path}>
                {isLast ? (
                  <span className="text-primary">
                    {uppercaseFirstLetter(path)}
                  </span>
                ) : (
                  <Link href={url}>{uppercaseFirstLetter(path)}</Link>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
