import { SheetMenu } from "@/components/shared/DashBoardPanel/SheetMenu";
import { UserNav } from "@/components/shared/DashBoardPanel/UserNav";
import { DashboardType } from "@/types/sidebar";

interface NavbarProps {
  type: DashboardType;
}

export function Navbar({ type }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 flex h-14 items-center sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu type={type} />
          {/* <h1 className="font-bold">{title}</h1> */}
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <UserNav />
        </div>
      </div>
    </header>
  );
}