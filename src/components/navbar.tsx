"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { EnterIcon, ExitIcon } from "@radix-ui/react-icons";
import { LogoutAction } from "@/lib/actions";
import { ThemeToggle } from "./theme/theme-toggle";
import { zUserRole } from "@/lib/entities";

export const Navbar = ({ role }: { role: zUserRole | undefined }) => {
  const path = usePathname();

  return (
    <div className="sticky top-0 border-b bg-background z-50">
      <div className="container h-16 flex items-center justify-between">
        <div className="flex items-center gap-16">
          <Link href={"/" + (role ?? "").toLowerCase()} className="text-xl">
            Ethics Olympiad
          </Link>
          {role === "Manager" && (
            <div className="flex items-center gap-4">
              <Link
                href={"/manager/events"}
                className={cn(path.includes("/manager/events") && "underline")}
              >
                Events
              </Link>
              <Link
                href={"/manager/cases"}
                className={cn(path.includes("/manager/cases") && "underline")}
              >
                Cases
              </Link>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <ThemeToggle />
          {role ? (
            <Button variant="ghost" size="icon" onClick={() => LogoutAction()}>
              <ExitIcon />
            </Button>
          ) : (
            path === "/" && (
              <Link href={`/login`}>
                <Button>
                  Login <EnterIcon className="w-4 ml-4" />
                </Button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};
