export type SidebarItem = {
  name: string;
  icon: React.ReactNode;
  href: string;
  children?: SidebarItem[];
  isActive?: boolean;
};
