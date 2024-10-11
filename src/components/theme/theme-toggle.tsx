"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Select defaultValue="system" value={theme} onValueChange={setTheme}>
      <SelectTrigger
        hideIcon
        className="p-0 w-9 flex justify-center focus-visible:ring-0 hover:bg-accent/50"
      >
        <SunIcon className="w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </SelectTrigger>
      <SelectContent align="end" className="text-sm">
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
};
