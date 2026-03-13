'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Pencil } from 'lucide-react';
import { updateLinkAction } from './actions';

interface EditLinkDialogProps {
  link: {
    id: number;
    originalUrl: string;
    shortCode: string;
  };
}

export function EditLinkDialog({ link }: EditLinkDialogProps) {
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
    const result = await updateLinkAction({
      id: link.id,
      originalUrl: formData.get('originalUrl') as string,
      shortCode: formData.get('shortCode') as string,
    });

    setIsSubmitting(false);

    if (result.success) {
      setOpen(false);
    } else if (result.error && typeof result.error === 'object') {
      setFieldErrors(
        result.error as { originalUrl?: string[]; shortCode?: string[] },
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
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit link</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit short link</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1">
            <Label htmlFor="edit-originalUrl">Destination URL</Label>
            <Input
              id="edit-originalUrl"
              name="originalUrl"
              type="url"
              defaultValue={link.originalUrl}
              placeholder="https://example.com/long-url"
              required
              className={cn(fieldErrors.originalUrl && 'border-destructive')}
            />
            {fieldErrors.originalUrl && (
              <p className="text-sm text-destructive">
                {fieldErrors.originalUrl[0]}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="edit-shortCode">Short code</Label>
            <Input
              id="edit-shortCode"
              name="shortCode"
              defaultValue={link.shortCode}
              placeholder="my-link"
              required
              className={cn(fieldErrors.shortCode && 'border-destructive')}
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
              {isSubmitting ? 'Saving...' : 'Save changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
