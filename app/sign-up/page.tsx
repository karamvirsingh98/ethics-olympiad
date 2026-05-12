"use client";

import { CheckCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SIGNUP_ACTION } from "@/lib/actions/auth";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { execute, isExecuting } = useAction(SIGNUP_ACTION);

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
          <CardTitle>Sign Up | Ethics Olympiad</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
              onClick={() => execute({ email, password, name })}
              disabled={isExecuting || !name || !email || !password}
            >
              Sign Up
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
