"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { SelectEvent } from "@/lib/schema";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CreateEvent } from "./create-event";

export const OlympiadEvents = ({
  events,
  olympiadId,
}: {
  events: SelectEvent[];
  olympiadId: number;
}) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Events in this Olympiad</CardTitle>
        <CreateEvent olympiadId={olympiadId} />
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/manager/olympiads/${olympiadId}/${event.id}`}
            className="p-4 border rounded-xl flex items-center justify-between hover:border-primary transition-colors"
          >
            {event.name}
            <ChevronRight className="size-4" />
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};
