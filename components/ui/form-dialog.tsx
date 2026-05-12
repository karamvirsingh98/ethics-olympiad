"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import * as React from "react";
import {
  DefaultValues,
  FieldValues,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { z, ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

type FormDialogProps<TSchema extends ZodType<FieldValues>> = {
  schema: TSchema;
  defaultValues: DefaultValues<z.infer<TSchema>>;
  // next-safe-action's SafeActionFn type is verbose; we accept any compatible
  // action and trust that `toInput` (or schema inference) produces the right
  // input shape.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any;
  trigger: React.ReactNode;
  title: string;
  description: string;
  submitLabel?: string;
  submitVariant?: React.ComponentProps<typeof Button>["variant"];
  /**
   * Mapper to transform form values into the action's input.
   * Defaults to identity.
   */
  toInput?: (values: z.infer<TSchema>) => unknown;
  /**
   * Predicate to disable the submit button based on current values.
   */
  canSubmit?: (values: z.infer<TSchema>) => boolean;
  onSuccess?: () => void;
  /**
   * Content width override.
   */
  contentClassName?: string;
  children: (form: UseFormReturn<z.infer<TSchema>>) => React.ReactNode;
};

export function FormDialog<TSchema extends ZodType<FieldValues>>({
  schema,
  defaultValues,
  action,
  trigger,
  title,
  description,
  submitLabel = "Submit",
  submitVariant,
  toInput,
  canSubmit,
  onSuccess,
  contentClassName,
  children,
}: FormDialogProps<TSchema>) {
  const [open, setOpen] = React.useState(false);

  type Values = z.infer<TSchema>;

  const form = useForm<Values>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues,
  });

  const { execute, isExecuting, result } = useAction(action, {
    onSuccess: () => {
      setOpen(false);
      onSuccess?.();
    },
  });

  // Reset the form to the latest defaults when the dialog re-opens, so editing
  // existing records picks up new prop values.
  React.useEffect(() => {
    if (open) form.reset(defaultValues);
    // We intentionally omit `defaultValues` from deps so the form isn't reset
    // on every render; new defaults are only applied when the dialog reopens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onSubmit = form.handleSubmit((values) => {
    execute(toInput ? toInput(values) : values);
  });

  const watched = form.watch();
  const submitDisabled =
    isExecuting || (canSubmit ? !canSubmit(watched as Values) : false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger as React.ReactElement} />
      <DialogContent className={contentClassName}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4 py-4">
            {children(form)}
            {result?.serverError ? (
              <p
                role="alert"
                className="text-sm text-destructive"
                data-slot="form-server-error"
              >
                {String(result.serverError)}
              </p>
            ) : null}
            <DialogFooter className="pt-2">
              <Button
                type="submit"
                variant={submitVariant}
                disabled={submitDisabled}
              >
                {submitLabel}
                {isExecuting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <CheckCircle />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
