"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown, CircleUser, Menu, Package2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuItem } from "@/types/navMenu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const NavMenuItems: MenuItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Events",
    href: "/events",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Other",
    children: [
      {
        title: "About",
        href: "/about",
        description: "Learn more about us, our mission and vision and more",
      },
      {
        title: "Contact",
        href: "/contact",
        description:
          "Get in touch with us for any queries or feedback or support requests",
      },
      {
        title: "FAQ",
        href: "/faq",
        description:
          "Frequently asked questions and answers about our service and products and more",
      },
      {
        title: "Terms of Service",
        href: "/terms",
        description:
          "Our terms and conditions of service and use of our products and services",
      },
      {
        title: "Privacy Policy",
        href: "/privacy",
        description: "Our privacy policy and how we handle your data and more",
      },
    ],
  },
];
export default function NavMenu() {
  const pathName = usePathname();
  return (
    <div>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {NavMenuItems.map((item) => (
          <div key={item.title}>
            {item.children ? (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={cn("")}>
                      <p>{item.title}</p>
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {item.children.map((item) => (
                          <ListItem
                            key={item.title}
                            title={item.title}
                            href={item.href}
                            className={cn({
                              "bg-accent": pathName === item.href,
                            })}
                          >
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              <Link
                href={item.href || "#"}
                className={cn("text-muted-foreground hover:text-foreground", {
                  "text-foreground": pathName === item.href,
                })}
              >
                {item.title}
              </Link>
            )}
          </div>
        ))}
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            {NavMenuItems.map((item) => (
              <div key={item.title}>
                <Link
                  href={item.href || "#"}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
