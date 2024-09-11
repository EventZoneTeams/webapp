import { DashboardType, Group } from "@/types/sidebar";
import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  PartyPopperIcon,
  PlusSquareIcon,
  ListIcon,
} from "lucide-react";

export function getMenuList(pathname: string, type: DashboardType): Group[] {
  switch (type) {
    case "admin":
      return [
        {
          groupLabel: "",
          menus: [
            {
              href: "/dashboard",
              label: "Dashboard",
              active: pathname === "/dashboard",
              icon: LayoutGrid,
              submenus: [],
            },
          ],
        },
        {
          groupLabel: "Events",
          menus: [
            {
              href: "/dashboard/events",
              label: "Events",
              active: pathname === "",
              icon: PartyPopperIcon,
              submenus: [
                {
                  href: "/dashboard/events",
                  label: "All Events",
                  active: pathname === "/dashboard/events",
                  icon: ListIcon,
                },
                {
                  href: "/dashboard/events/create",
                  label: "New Event",
                  active: pathname === "/dashboard/events/create",
                  icon: PlusSquareIcon,
                },
              ],
            },
          ],
        },
        {
          groupLabel: "Settings",
          menus: [
            {
              href: "/users",
              label: "Users",
              active: pathname.includes("/users"),
              icon: Users,
              submenus: [],
            },
            {
              href: "/account",
              label: "Account",
              active: pathname.includes("/account"),
              icon: Settings,
              submenus: [],
            },
          ],
        },
      ];

    case "manager":
      return [
        {
          groupLabel: "",
          menus: [
            {
              href: "/dashboard",
              label: "Dashboard",
              active: pathname === "/dashboard",
              icon: LayoutGrid,
              submenus: [],
            },
          ],
        },
        {
          groupLabel: "Events",
          menus: [
            {
              href: "/dashboard/events",
              label: "Events",
              active: pathname === "",
              icon: PartyPopperIcon,
              submenus: [
                {
                  href: "/dashboard/events",
                  label: "All Events",
                  active: pathname === "/dashboard/events",
                  icon: ListIcon,
                },
                {
                  href: "/dashboard/events/create",
                  label: "New Event",
                  active: pathname === "/dashboard/events/create",
                  icon: PlusSquareIcon,
                },
              ],
            },
          ],
        },
        {
          groupLabel: "Settings",
          menus: [
            {
              href: "/users",
              label: "Users",
              active: pathname.includes("/users"),
              icon: Users,
              submenus: [],
            },
            {
              href: "/account",
              label: "Account",
              active: pathname.includes("/account"),
              icon: Settings,
              submenus: [],
            },
          ],
        },
      ];
    case "organizer":
      return [
        {
          groupLabel: "",
          menus: [
            {
              href: "/dashboard",
              label: "Dashboard",
              active: pathname === "/dashboard",
              icon: LayoutGrid,
              submenus: [],
            },
          ],
        },
        {
          groupLabel: "Events",
          menus: [
            {
              href: "/dashboard/events",
              label: "Events",
              active: pathname === "",
              icon: PartyPopperIcon,
              submenus: [
                {
                  href: "/dashboard/events",
                  label: "All Events",
                  active: pathname === "/dashboard/events",
                  icon: ListIcon,
                },
                {
                  href: "/dashboard/events/create",
                  label: "New Event",
                  active: pathname === "/dashboard/events/create",
                  icon: PlusSquareIcon,
                },
              ],
            },
          ],
        },
        {
          groupLabel: "Settings",
          menus: [
            {
              href: "/users",
              label: "Users",
              active: pathname.includes("/users"),
              icon: Users,
              submenus: [],
            },
            {
              href: "/account",
              label: "Account",
              active: pathname.includes("/account"),
              icon: Settings,
              submenus: [],
            },
          ],
        },
      ];
    default:
      return [];
  }
}
