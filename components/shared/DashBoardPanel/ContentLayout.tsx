import { Navbar } from "@/components/shared/DashBoardPanel/Navbar";
import { DashboardType } from "@/types/sidebar";

interface ContentLayoutProps {
  children: React.ReactNode;
  type: DashboardType;
}

export function ContentLayout({ children, type }: ContentLayoutProps) {
  return (
    <>
      <Navbar type={type} />
      <div className="container px-4 pb-8 pt-8 sm:px-8">{children}</div>
    </>
  );
}
