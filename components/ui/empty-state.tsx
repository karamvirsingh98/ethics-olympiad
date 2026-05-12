import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}) => (
  <div
    className={cn(
      "col-span-full flex flex-col items-center justify-center gap-2 py-16 text-center",
      className
    )}
  >
    <Icon
      className="size-12 text-muted-foreground/40 mb-2"
      strokeWidth={1.5}
    />
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
  </div>
);
