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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SIGNUP_ACTION } from "@/lib/actions/auth";
import { UserRole, userRoles } from "@/lib/enums";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole | null>(null);

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
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a role" className="capitalize" />
            </SelectTrigger>
            <SelectContent>
              {userRoles
                .filter((role) => role !== "admin")
                .map((role) => (
                  <SelectItem key={role} value={role} className="capitalize">
                    {role}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter>
          <div className="ml-auto">
            <Button
              onClick={() => role && execute({ email, password, name, role })}
              disabled={isExecuting || !name || !email || !password || !role}
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
