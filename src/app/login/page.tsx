"use client";

import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { EnterIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useAction } from "next-safe-action/hooks";
import { LoginAction } from "@/lib/actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { execute, isPending } = useAction(LoginAction, {
    onError: () => {
      alert("Invalid login credentials");
      setPassword("");
    },
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!email || !password) return;
      if (e.key === "Enter") execute({ email, password });
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [execute, email, password]);

  return (
    <div className="h-[60vh] grid place-items-center">
      <div className="w-96 p-4 border rounded-md flex flex-col gap-8">
        <p className="text-xl font-bold">Login</p>
        <div className="flex flex-col gap-4">
          <Input
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <Button
            disabled={!email || !password}
            onClick={() => execute({ email, password })}
          >
            Login
            {isPending ? (
              <ReloadIcon className="w-4 ml-4 animate-spin" />
            ) : (
              <EnterIcon className="w-4 ml-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
