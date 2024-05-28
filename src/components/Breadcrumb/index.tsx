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
  console.log(splitPath);

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
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem key={path}>
                <BreadcrumbLink>
                  {isLast ? (
                    <span className="text-primary">
                      {uppercaseFirstLetter(path)}
                    </span>
                  ) : (
                    <Link href={`/${path}`}>{uppercaseFirstLetter(path)}</Link>
                  )}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
