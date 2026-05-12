"use client";

import { PlusCircle } from "lucide-react";
import z from "zod";

import { UPSERT_EVENT_ACTION } from "@/lib/actions/olympiads";

import { Button } from "../ui/button";
import { DatePicker } from "../ui/datepicker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FormDialog } from "../ui/form-dialog";
import { Input } from "../ui/input";

const schema = z.object({
  name: z.string().min(1, "Event name is required"),
  happensAt: z.date({ message: "Pick a date" }),
});

type FormValues = z.infer<typeof schema>;

export const CreateEvent = ({ olympiadId }: { olympiadId: number }) => {
  return (
    <FormDialog
      schema={schema}
      defaultValues={{ name: "", happensAt: undefined as unknown as Date }}
      action={UPSERT_EVENT_ACTION}
      title="Create Event"
      description="Add a new event under this olympiad."
      submitLabel="Submit"
      toInput={(values: FormValues) => ({
        name: values.name,
        olympiadId,
        teams: [],
        happensAt: values.happensAt,
      })}
      trigger={
        <Button size="xs">
          Add Event
          <PlusCircle />
        </Button>
      }
    >
      {(form) => (
        <>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="happensAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Date</FormLabel>
                <FormControl>
                  <DatePicker date={field.value} setDate={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </FormDialog>
  );
};
