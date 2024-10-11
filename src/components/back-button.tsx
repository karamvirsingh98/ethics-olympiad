"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

export const BackButton = () => {
  const router = useRouter();
  return (
    <Button size="icon" variant="ghost" onClick={() => router.back()}>
      <ChevronLeftIcon className="w-4" />
    </Button>
  );
};
