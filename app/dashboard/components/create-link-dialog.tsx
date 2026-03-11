"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { createLinkAction } from "./actions";

export function CreateLinkDialog() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    originalUrl?: string[];
    shortCode?: string[];
  }>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldErrors({});
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const result = await createLinkAction({
      originalUrl: formData.get("originalUrl") as string,
      shortCode: formData.get("shortCode") as string,
    });

    setIsSubmitting(false);

    if (result.success) {
      setOpen(false);
    } else if (result.error && typeof result.error === "object") {
      setFieldErrors(
        result.error as { originalUrl?: string[]; shortCode?: string[] }
      );
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setFieldErrors({});
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a new short link</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1">
            <Label htmlFor="originalUrl">Destination URL</Label>
            <Input
              id="originalUrl"
              name="originalUrl"
              type="url"
              placeholder="https://example.com/long-url"
              required
              className={cn(fieldErrors.originalUrl && "border-destructive")}
            />
            {fieldErrors.originalUrl && (
              <p className="text-sm text-destructive">
                {fieldErrors.originalUrl[0]}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="shortCode">Short code</Label>
            <Input
              id="shortCode"
              name="shortCode"
              placeholder="my-link"
              required
              className={cn(fieldErrors.shortCode && "border-destructive")}
            />
            {fieldErrors.shortCode && (
              <p className="text-sm text-destructive">
                {fieldErrors.shortCode[0]}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating…" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
