"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { EnterIcon, ExitIcon } from "@radix-ui/react-icons";

export const Navbar = ({ authenticated }: { authenticated: boolean }) => {
  const path = usePathname();

  return (
    <div className="sticky top-0 border-b bg-accent z-50">
      <div className="container h-16 flex items-center justify-between">
        <div className="flex items-center gap-16">
          <Link href="/" className="text-xl">
            Ethics Olympiad
          </Link>
          {authenticated && (
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
        {authenticated ? (
          <Button variant="outline">
            Log Out <ExitIcon className="w-4 ml-4" />
          </Button>
        ) : (
          <Link href={`/manager`}>
            <Button>
              Manager Login <EnterIcon className="w-4 ml-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
