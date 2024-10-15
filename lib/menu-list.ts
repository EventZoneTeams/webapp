import { DashboardType, Group } from "@/types/sidebar";
import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  Ticket,
  PartyPopperIcon,
  PlusSquareIcon,
  UserRoundPen,
  ListIcon,
  UsersIcon,
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
          groupLabel: "Users",
          menus: [
            {
              href: "/dashboard/user-management",
              label: "Users Management",
              active: pathname === "/dashboard/user-management",
              icon: UsersIcon,
              submenus: [],
            },
          ],
        },

        {
          groupLabel: "Settings",
          menus: [
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
              href: "/dashboard/manage-events",
              label: "Manage Events",
              active: pathname === "/dashboard/manage-events",
              icon: PartyPopperIcon,
              submenus: [],
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
        // {
        //   groupLabel: "",
        //   menus: [
        //     {
        //       href: "/dashboard",
        //       label: "Dashboard",
        //       active: pathname === "/dashboard",
        //       icon: LayoutGrid,
        //       submenus: [],
        //     },
        //   ],
        // },
        {
          groupLabel: "",
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
                  active:
                    pathname.startsWith("/dashboard/events") &&
                    pathname !== "/dashboard/events/create",
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
          groupLabel: "",
          menus: [
            {
              href: "/dashboard/event-staff",
              label: "Staff",
              active: pathname === "",
              icon: UserRoundPen,
              submenus: [
                {
                  href: "/dashboard/event-staff",
                  label: "Events",
                  active:
                    pathname.startsWith("/dashboard/event-staff"),
                  icon: Ticket,
                },
              ],
            },
          ],
        },
      ];
    default:
      return [];
  }
}
