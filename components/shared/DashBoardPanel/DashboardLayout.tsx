"use client";

import { ContentLayout } from "@/components/shared/DashBoardPanel/ContentLayout";
import { Footer } from "@/components/shared/DashBoardPanel/Footer";
import { Sidebar } from "@/components/shared/DashBoardPanel/Sidebar";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { DashboardType } from "@/types/sidebar";
export default function DashBoardLayout({
  children,
  type,
}: {
  children: React.ReactNode;
  type: DashboardType;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const title = document.title;

  if (!sidebar) return null;

  return (
    <>
      <Sidebar type={type} />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-gray-200 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
        )}
      >
        <ContentLayout title={title}>{children}</ContentLayout>
      </main>
      <footer
        className={cn(
          "transition-[margin-left] duration-300 ease-in-out",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
        )}
      >
        <Footer />
      </footer>
    </>
  );
}
