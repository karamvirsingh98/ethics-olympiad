"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const path = usePathname();

  return (
    <div className="sticky top-0 border-b bg-accent z-50">
      <div className="container h-16 flex items-center justify-between">
        <p className="text-xl">Ethics Olympiad</p>
        <div className="flex gap-4">
          <Link
            href={"/manager/cases"}
            className={cn(
              "text-sm",
              path.includes("/manager/cases") && "underline"
            )}
          >
            Cases
          </Link>
          <Link
            href={"/manager/events"}
            className={cn(
              "text-sm",
              path.includes("/manager/events") && "underline"
            )}
          >
            Events
          </Link>
          <Link href={"/olympiads"} className="text-sm">
            Olympiads
          </Link>
        </div>
      </div>
    </div>
  );
};
