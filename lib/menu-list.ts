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
              active: pathname === "/dashboard/events",
              icon: PartyPopperIcon,
              submenus: [
                {
                  href: "/dashboard/events",
                  label: "All Events",
                  active: pathname === "/dashboard/events",
                },
                {
                  href: "/dashboard/events/new",
                  label: "New Event",
                  active: pathname === "/dashboard/events/new",
                },
              ],
            },
          ],
        },

        {
          groupLabel: "Contents",
          menus: [
            {
              href: "",
              label: "Posts",
              active: pathname.includes("/posts"),
              icon: SquarePen,
              submenus: [
                {
                  href: "/posts",
                  label: "All Posts",
                  active: pathname === "/posts",
                },
                {
                  href: "/posts/new",
                  label: "New Post",
                  active: pathname === "/posts/new",
                },
              ],
            },
            {
              href: "/categories",
              label: "Categories",
              active: pathname.includes("/categories"),
              icon: Bookmark,
              submenus: [],
            },
            {
              href: "/tags",
              label: "Tags",
              active: pathname.includes("/tags"),
              icon: Tag,
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

    case "manager":
      return [];
    case "organizer":
      return [];
    default:
      return [];
  }
}
