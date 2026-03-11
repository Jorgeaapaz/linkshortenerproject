"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createLink } from "@/data/links";
import { revalidatePath } from "next/cache";

const schema = z.object({
  originalUrl: z.string().url({ message: "Please enter a valid URL." }),
  shortCode: z
    .string()
    .min(1, { message: "Short code is required." })
    .max(50, { message: "Short code must be 50 characters or fewer." })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Short code may only contain letters, numbers, hyphens, and underscores.",
    }),
});

type CreateLinkInput = z.infer<typeof schema>;

export async function createLinkAction(input: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = schema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  await createLink({ ...parsed.data, userId });

  revalidatePath("/dashboard");

  return { success: true };
}
