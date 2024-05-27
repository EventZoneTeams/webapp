import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavMenu from "@/components/Navbar/NavMenu";
import { UserMenu } from "@/components/Navbar/UserMenu";

export default function Navbar() {
  return (
    <header className="sticky top-0 flex h-20 items-center gap-4 border-b  px-4 md:px-6 backdrop-blur-3xl bg-muted/40">
      <div className="flex-1 flex items-center gap-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image
            src="/images/logo-noText.svg"
            alt="Event Zone Logo"
            width={32}
            height={32}
          />
        </Link>
        <NavMenu />
      </div>

      <UserMenu />
    </header>
  );
}
