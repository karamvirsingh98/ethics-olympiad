"use client";

import { LogOut, User } from "lucide-react";
import Link from "next/link";

import { LOGOUT_ACTION } from "@/lib/actions/auth";
import { SelectUser } from "@/lib/schema";

import { ThemeToggle } from "./theme/theme-toggle";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Navbar = ({
  base,
  links,
  user,
}: {
  base: string;
  links: { label: string; href: string }[];
  user: SelectUser;
}) => {
  return (
    <div className="sticky top-0 bg-background z-50 w-full border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href={base} className="text-xl font-bold">
            ETHICS OLYMPIAD
          </Link>
          <div className="flex items-center gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm hover:underline hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="sm" className="gap-2">
                  <User />
                  <span className="max-w-[140px] truncate">{user.name}</span>
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <p className="text-sm font-medium text-foreground">
                  {user.name}
                </p>
                <p className="text-xs capitalize text-muted-foreground">
                  {user.role}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => LOGOUT_ACTION()}
              >
                <LogOut />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
