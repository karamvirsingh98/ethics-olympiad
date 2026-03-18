"use client";

import { CheckCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LOGIN_ACTION } from "@/lib/actions/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { execute, isExecuting } = useAction(LOGIN_ACTION);

  useEffect(() => {
    const listener = (ev: KeyboardEvent) => {
      if (ev.key === "Enter") execute({ email, password });
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [email, password, execute]);

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <Image
        src="/hero.png"
        alt="Logo"
        fill
        className="object-cover opacity-10"
      />
      <Card className="z-10">
        <CardHeader>
          <CardTitle>Login | Ethics Olympiad</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <div className="ml-auto">
            <Button
              onClick={() => execute({ email, password })}
              disabled={isExecuting}
            >
              Login
              {isExecuting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <CheckCircle />
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
