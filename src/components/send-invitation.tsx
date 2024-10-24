"use client";

import { useAction } from "next-safe-action/hooks";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { SendInvitationAction } from "@/lib/actions";
import { useEffect, useState } from "react";
import { CheckCircledIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { Input } from "./ui/input";
import { zUserRole } from "@/lib/entities";
import { RoleSelector } from "./role-selector";

export const SendInvitation = () => {
  const [open, setOpen] = useState(false);
  const { execute, isPending } = useAction(SendInvitationAction, {
    onSuccess: () => setOpen(false),
  });

  const [email, setEmail] = useState("");
  const [role, setRole] = useState<zUserRole>();

  useEffect(() => {
    if (!open) {
      setEmail("");
      setRole(undefined);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Send Invitation <PaperPlaneIcon className="ml-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Invitation</DialogTitle>
        </DialogHeader>
        <div className="py-8 flex flex-col gap-4">
          <div className="flex items-center">
            <p className="text-muted-foreground w-16 shrink-0">Email:</p>
            <Input
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <p className="text-muted-foreground w-16 shrink-0">Role:</p>
            <RoleSelector value={role} onChange={setRole} />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={isPending}
            onClick={() => role && execute({ email, role })}
          >
            Confirm <CheckCircledIcon className="ml-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
