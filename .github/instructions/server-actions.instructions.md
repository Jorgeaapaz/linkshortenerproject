---
description: Read this before implementing or modifying any data mutations. This file outlines the rules and best practices for using server actions as the sole mechanism for data mutations in this application.
---

# Server Actions

All data mutations must be performed via **server actions**. No API routes should be created for mutation operations.

---

## Rules

- **Server actions are the only way to mutate data.** Never use API routes for mutations.
- **Server actions must be called from Client Components.** Mark the calling component with `"use client"`.
- **Action files must be named `actions.ts`** and colocated in the same directory as the component that calls them.
- **Never use `FormData` as a parameter type.** Define explicit TypeScript types or interfaces for all inputs.
- **All inputs must be validated with Zod** before any logic is executed.
- **Always check for an authenticated user first.** Use Clerk's `auth()` and return an error object if no `userId` is found.
- **Never call Drizzle directly inside a server action.** Delegate all database operations to helper functions in `/data`.
- **Never throw errors.** Return a typed object with either a `success` or `error` property.

---

## File Structure

```
app/
  dashboard/
    components/
      create-link-form.tsx   ← "use client" component
      actions.ts             ← server action colocated here
data/
  links.ts                   ← Drizzle query helpers
```

---

## Server Action Template

```ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createLink } from "@/data/links";

const schema = z.object({
  url: z.string().url(),
  slug: z.string().min(1),
});

type CreateLinkInput = z.infer<typeof schema>;

export async function createLinkAction(input: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = schema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.flatten() };

  await createLink({ ...parsed.data, userId });

  return { success: true };
}
```

---

## Data Helper Functions (`/data`)

Database queries are wrapped in helper functions and **must not** be duplicated inside server actions.

```ts
// data/links.ts
import { db } from "@/db";
import { links } from "@/db/schema";

export async function createLink(data: {
  url: string;
  slug: string;
  userId: string;
}) {
  return db.insert(links).values(data);
}
```
