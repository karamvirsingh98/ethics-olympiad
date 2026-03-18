"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";

import { LOGOUT_ACTION } from "@/lib/actions/auth";

import { ThemeToggle } from "./theme/theme-toggle";
import { Button } from "./ui/button";

export const Navbar = ({
  base,
  links,
}: {
  base: string;
  links: { label: string; href: string }[];
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
          <Button variant="outline" size="icon" onClick={() => LOGOUT_ACTION()}>
            <LogOut />
          </Button>
        </div>
      </div>
    </div>
  );
};
