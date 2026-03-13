import db from "@/db";
import { links } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getLinksByUserId(userId: string) {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(links.createdAt);
}

export async function createLink(data: {
  originalUrl: string;
  shortCode: string;
  userId: string;
}) {
  return db.insert(links).values(data);
}

export async function updateLink(
  id: number,
  userId: string,
  data: { originalUrl: string; shortCode: string },
) {
  return db
    .update(links)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(links.id, id), eq(links.userId, userId)));
}

export async function deleteLink(id: number, userId: string) {
  return db
    .delete(links)
    .where(and(eq(links.id, id), eq(links.userId, userId)));
}
