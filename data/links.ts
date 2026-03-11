import db from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

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
