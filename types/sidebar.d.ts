export type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
};

export type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

export type Group = {
  groupLabel: string;
  menus: Menu[];
};

export type DashboardType = "admin" | "manager" | "organizer";
