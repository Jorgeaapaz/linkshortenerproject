"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createLink, deleteLink, updateLink } from "@/data/links";
import { revalidatePath } from "next/cache";

const createSchema = z.object({
  originalUrl: z.string().url({ message: "Please enter a valid URL." }),
  shortCode: z
    .string()
    .min(1, { message: "Short code is required." })
    .max(50, { message: "Short code must be 50 characters or fewer." })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        "Short code may only contain letters, numbers, hyphens, and underscores.",
    }),
});

const updateSchema = z.object({
  id: z.number().int().positive(),
  originalUrl: z.string().url({ message: "Please enter a valid URL." }),
  shortCode: z
    .string()
    .min(1, { message: "Short code is required." })
    .max(50, { message: "Short code must be 50 characters or fewer." })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        "Short code may only contain letters, numbers, hyphens, and underscores.",
    }),
});

type CreateLinkInput = z.infer<typeof createSchema>;
type UpdateLinkInput = z.infer<typeof updateSchema>;

export async function createLinkAction(input: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = createSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  await createLink({ ...parsed.data, userId });

  revalidatePath("/dashboard");

  return { success: true };
}

export async function updateLinkAction(input: UpdateLinkInput) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = updateSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  await updateLink(parsed.data.id, userId, {
    originalUrl: parsed.data.originalUrl,
    shortCode: parsed.data.shortCode,
  });

  revalidatePath("/dashboard");

  return { success: true };
}

export async function deleteLinkAction(id: number) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = z.number().int().positive().safeParse(id);
  if (!parsed.success) return { error: "Invalid link ID" };

  await deleteLink(parsed.data, userId);

  revalidatePath("/dashboard");

  return { success: true };
}
