"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { EnterIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useAction } from "next-safe-action/hooks";
import { LoginJudgeAction } from "@/lib/actions";

export const LoginJudge = ({ eventId }: { eventId: number }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { execute, isPending } = useAction(LoginJudgeAction);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !!name && !!password) {
        execute({ eventId, name, password });
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [execute, eventId, name, password]);

  return (
    <div className="w-96 p-4 border rounded-md flex flex-col gap-8">
      <p className="text-xl font-bold">Event Login</p>
      <div className="flex flex-col gap-4">
        <Input
          value={name}
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          value={password}
          placeholder="Enter Event Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={() => execute({ eventId, name, password })}>
          Login
          {isPending ? (
            <ReloadIcon className="w-4 ml-4 animate-spin" />
          ) : (
            <EnterIcon className="w-4 ml-4" />
          )}
        </Button>
      </div>
    </div>
  );
};
