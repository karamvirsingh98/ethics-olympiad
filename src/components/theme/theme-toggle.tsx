"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Select defaultValue="system" value={theme} onValueChange={setTheme}>
      <SelectTrigger
        hideIcon
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "p-0 border-none shadow-none focus:ring-0 focus-visible:ring-0"
        )}
      >
        <SunIcon className="w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </SelectTrigger>
      <SelectContent align="start">
        <SelectItem value="light" className="text-xs">
          Light
        </SelectItem>
        <SelectItem value="dark" className="text-xs">
          Dark
        </SelectItem>
        <SelectItem value="system" className="text-xs">
          System
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
